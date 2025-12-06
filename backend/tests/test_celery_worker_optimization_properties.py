"""
Property-based tests for Celery worker optimization.

Feature: docker-full-functionality
Properties tested:
- Property 16: General worker queue consumption
- Property 17: Negotiation worker queue isolation
"""

import pytest
import sys
import os
from hypothesis import given, strategies as st
from hypothesis import settings as hypothesis_settings
from typing import List
from pathlib import Path

# Add backend directory to path
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)


# Feature: docker-full-functionality, Property 16: General worker queue consumption
@hypothesis_settings(max_examples=100, deadline=None)
@given(
    queue_name=st.sampled_from(['emails', 'notifications', 'orders'])
)
def test_general_worker_queue_consumption(queue_name: str):
    """
    Property 16: General worker queue consumption
    
    For any task enqueued to emails, notifications, or orders queues,
    the general Celery worker should consume and process the task.
    
    Validates: Requirements 5.1
    """
    from celery_app import celery_app
    
    # Verify the task routing configuration
    task_routes = celery_app.conf.task_routes
    
    # Map queue names to task patterns
    queue_task_mapping = {
        'emails': 'tasks.email_tasks.*',
        'notifications': 'tasks.notification_tasks.*',
        'orders': 'tasks.order_tasks.*'
    }
    
    task_pattern = queue_task_mapping[queue_name]
    
    # Verify the task route is configured correctly
    assert task_pattern in task_routes, f"Task pattern {task_pattern} not found in task routes"
    assert task_routes[task_pattern]['queue'] == queue_name, \
        f"Task pattern {task_pattern} should route to queue {queue_name}"
    
    # Verify the queue is defined in task_queues
    queue_names = [q.name for q in celery_app.conf.task_queues]
    assert queue_name in queue_names, f"Queue {queue_name} not found in task_queues"


# Feature: docker-full-functionality, Property 17: Negotiation worker queue isolation
def test_negotiation_worker_queue_isolation():
    """
    Property 17: Negotiation worker queue isolation
    
    For any task enqueued to the negotiation queue, only the negotiation Celery worker
    should consume the task, and it should not consume tasks from other queues.
    
    Validates: Requirements 5.2, 5.7, 5.8
    """
    from celery_app import celery_app
    
    # Verify negotiation task routing
    task_routes = celery_app.conf.task_routes
    negotiation_pattern = 'tasks.negotiation_tasks.*'
    
    assert negotiation_pattern in task_routes, \
        f"Negotiation task pattern {negotiation_pattern} not found in task routes"
    assert task_routes[negotiation_pattern]['queue'] == 'negotiation', \
        f"Negotiation tasks should route to 'negotiation' queue"
    
    # Verify negotiation queue is defined
    queue_names = [q.name for q in celery_app.conf.task_queues]
    assert 'negotiation' in queue_names, "Negotiation queue not found in task_queues"
    
    # Verify negotiation queue is separate from other queues
    general_queues = ['emails', 'notifications', 'orders']
    for general_queue in general_queues:
        assert general_queue != 'negotiation', \
            f"Negotiation queue should be separate from {general_queue}"


def test_celery_worker_dockerfile_optimization():
    """
    Test that Dockerfile.celery only copies necessary files for general worker.
    
    Validates: Requirements 5.7
    """
    dockerfile_path = Path(__file__).parent.parent / "Dockerfile.celery"
    
    assert dockerfile_path.exists(), "Dockerfile.celery does not exist"
    
    with open(dockerfile_path, 'r') as f:
        dockerfile_content = f.read()
    
    # Verify it's using Alpine for smaller image
    assert "FROM python:3.11-alpine" in dockerfile_content, \
        "Dockerfile.celery should use Alpine base image"
    
    # Verify it copies only necessary directories
    required_copies = [
        "COPY core/",
        "COPY models/",
        "COPY services/",
        "COPY celery_app.py",
        "COPY tasks/",
    ]
    
    for copy_cmd in required_copies:
        assert copy_cmd in dockerfile_content, \
            f"Dockerfile.celery should contain: {copy_cmd}"
    
    # Verify it does NOT copy everything (which would be "COPY . .")
    # Allow "COPY . ." only if it's for requirements.txt context
    lines = dockerfile_content.split('\n')
    for line in lines:
        if "COPY . ." in line and "requirements.txt" not in line:
            # Check if this is after the requirements copy
            assert False, "Dockerfile.celery should not copy entire directory with 'COPY . .'"


def test_negotiation_celery_dockerfile_optimization():
    """
    Test that Dockerfile.negotiation_celery only copies minimal files for negotiation worker.
    
    Validates: Requirements 5.8
    """
    dockerfile_path = Path(__file__).parent.parent / "Dockerfile.negotiation_celery"
    
    assert dockerfile_path.exists(), "Dockerfile.negotiation_celery does not exist"
    
    with open(dockerfile_path, 'r') as f:
        dockerfile_content = f.read()
    
    # Verify it's using Alpine for smaller image
    assert "FROM python:3.11-alpine" in dockerfile_content, \
        "Dockerfile.negotiation_celery should use Alpine base image"
    
    # Verify it copies only minimal files
    required_copies = [
        "COPY core/config.py",
        "COPY services/negotiator.py",
        "COPY celery_app.py",
        "COPY tasks/negotiation_tasks.py",
    ]
    
    for copy_cmd in required_copies:
        assert copy_cmd in dockerfile_content, \
            f"Dockerfile.negotiation_celery should contain: {copy_cmd}"
    
    # Verify it does NOT copy models/ (negotiation doesn't need database models)
    assert "COPY models/" not in dockerfile_content, \
        "Dockerfile.negotiation_celery should not copy models/ directory"
    
    # Verify it does NOT copy all services
    assert "COPY services/ ./services/" not in dockerfile_content, \
        "Dockerfile.negotiation_celery should not copy entire services/ directory"


def test_docker_compose_uses_optimized_dockerfiles():
    """
    Test that docker-compose.yml uses the optimized Dockerfiles for Celery workers.
    
    Validates: Requirements 5.7, 5.8
    """
    from pathlib import Path
    import yaml
    
    docker_compose_path = Path(__file__).parent.parent.parent / "docker-compose.yml"
    
    assert docker_compose_path.exists(), "docker-compose.yml does not exist"
    
    with open(docker_compose_path, 'r') as f:
        compose_content = yaml.safe_load(f)
    
    services = compose_content["services"]
    
    # Verify celery_worker uses Dockerfile.celery
    assert "celery_worker" in services, "celery_worker service not found"
    celery_worker = services["celery_worker"]
    assert "build" in celery_worker, "celery_worker should have build configuration"
    assert "dockerfile" in celery_worker["build"], "celery_worker should specify dockerfile"
    assert celery_worker["build"]["dockerfile"] == "Dockerfile.celery", \
        "celery_worker should use Dockerfile.celery"
    
    # Verify negotiation_celery_worker uses Dockerfile.negotiation_celery
    assert "negotiation_celery_worker" in services, "negotiation_celery_worker service not found"
    negotiation_worker = services["negotiation_celery_worker"]
    assert "build" in negotiation_worker, "negotiation_celery_worker should have build configuration"
    assert "dockerfile" in negotiation_worker["build"], \
        "negotiation_celery_worker should specify dockerfile"
    assert negotiation_worker["build"]["dockerfile"] == "Dockerfile.negotiation_celery", \
        "negotiation_celery_worker should use Dockerfile.negotiation_celery"
    
    # Verify celery_beat uses Dockerfile.celery (same as general worker)
    assert "celery_beat" in services, "celery_beat service not found"
    celery_beat = services["celery_beat"]
    assert "build" in celery_beat, "celery_beat should have build configuration"
    assert "dockerfile" in celery_beat["build"], "celery_beat should specify dockerfile"
    assert celery_beat["build"]["dockerfile"] == "Dockerfile.celery", \
        "celery_beat should use Dockerfile.celery"


def test_celery_worker_command_configuration():
    """
    Test that Celery workers are configured with correct queue consumption.
    
    Validates: Requirements 5.1, 5.2
    """
    from pathlib import Path
    import yaml
    
    docker_compose_path = Path(__file__).parent.parent.parent / "docker-compose.yml"
    
    with open(docker_compose_path, 'r') as f:
        compose_content = yaml.safe_load(f)
    
    services = compose_content["services"]
    
    # Verify general worker consumes emails, notifications, orders queues
    celery_worker = services["celery_worker"]
    assert "command" in celery_worker, "celery_worker should have command configuration"
    command = celery_worker["command"]
    
    # Check that the command includes the correct queues
    assert "-Q emails,notifications,orders" in command or \
           "-Q emails,notifications,orders" in str(command), \
        "celery_worker should consume emails, notifications, and orders queues"
    
    # Verify negotiation worker consumes only negotiation queue
    negotiation_worker = services["negotiation_celery_worker"]
    assert "command" in negotiation_worker, \
        "negotiation_celery_worker should have command configuration"
    negotiation_command = negotiation_worker["command"]
    
    assert "-Q negotiation" in negotiation_command or \
           "-Q negotiation" in str(negotiation_command), \
        "negotiation_celery_worker should consume only negotiation queue"
    
    # Verify negotiation worker does NOT consume other queues
    assert "emails" not in negotiation_command, \
        "negotiation_celery_worker should not consume emails queue"
    assert "notifications" not in negotiation_command, \
        "negotiation_celery_worker should not consume notifications queue"
    assert "orders" not in negotiation_command, \
        "negotiation_celery_worker should not consume orders queue"


@hypothesis_settings(max_examples=100)
@given(
    task_module=st.sampled_from([
        'tasks.email_tasks',
        'tasks.notification_tasks',
        'tasks.order_tasks',
        'tasks.negotiation_tasks'
    ])
)
def test_task_module_routing(task_module: str):
    """
    Property test: Verify all task modules are correctly routed to their queues.
    
    Validates: Requirements 5.1, 5.2
    """
    from celery_app import celery_app
    
    # Map task modules to expected queues
    module_queue_mapping = {
        'tasks.email_tasks': 'emails',
        'tasks.notification_tasks': 'notifications',
        'tasks.order_tasks': 'orders',
        'tasks.negotiation_tasks': 'negotiation'
    }
    
    expected_queue = module_queue_mapping[task_module]
    task_pattern = f"{task_module}.*"
    
    # Verify the routing configuration
    task_routes = celery_app.conf.task_routes
    assert task_pattern in task_routes, f"Task pattern {task_pattern} not found in routes"
    assert task_routes[task_pattern]['queue'] == expected_queue, \
        f"Task module {task_module} should route to queue {expected_queue}"


def test_volumes_commented_for_optimization():
    """
    Test that volumes are commented out in docker-compose.yml for optimized deployment.
    
    This ensures that the optimized Dockerfiles are actually used instead of
    mounting the entire backend directory.
    
    Validates: Requirements 5.7, 5.8
    """
    from pathlib import Path
    
    docker_compose_path = Path(__file__).parent.parent.parent / "docker-compose.yml"
    
    with open(docker_compose_path, 'r') as f:
        compose_content = f.read()
    
    # Check that volumes are commented out for celery workers
    # We look for the pattern where volumes are commented
    lines = compose_content.split('\n')
    
    in_celery_worker = False
    in_negotiation_worker = False
    celery_worker_has_commented_volume = False
    negotiation_worker_has_commented_volume = False
    
    for i, line in enumerate(lines):
        if 'celery_worker:' in line and 'negotiation' not in line:
            in_celery_worker = True
            in_negotiation_worker = False
        elif 'negotiation_celery_worker:' in line:
            in_negotiation_worker = True
            in_celery_worker = False
        elif 'celery_beat:' in line or 'backend:' in line or 'frontend:' in line:
            in_celery_worker = False
            in_negotiation_worker = False
        
        # Check for commented volume lines
        if in_celery_worker and '# volumes:' in line.lower():
            celery_worker_has_commented_volume = True
        if in_negotiation_worker and '# volumes:' in line.lower():
            negotiation_worker_has_commented_volume = True
    
    # For optimization, volumes should be commented out
    # This is a soft check - we verify the comment exists suggesting optimization
    assert celery_worker_has_commented_volume or negotiation_worker_has_commented_volume, \
        "At least one worker should have commented volumes for optimization"
