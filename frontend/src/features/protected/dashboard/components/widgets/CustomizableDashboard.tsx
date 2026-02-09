import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import {
  PlusIcon,
  SettingsIcon,
  TrashIcon,
  GripVerticalIcon,
  EditIcon,
  SaveIcon,
  XIcon
} from 'lucide-react';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { Button } from '@/components/ui/Button';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const CustomizableDashboard = ({
  widgets: initialWidgets,
  widgetTemplates,
  editable = true,
  onWidgetsChange,
  onSave,
  className = ''
}) => {
  const [widgets, setWidgets] = useState(initialWidgets);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showWidgetLibrary, setShowWidgetLibrary] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState(null);
  const [editingWidget, setEditingWidget] = useState(null);

  useEffect(() => {
    setWidgets(initialWidgets);
  }, [initialWidgets]);

  useEffect(() => {
    if (onWidgetsChange) {
      onWidgetsChange(widgets);
    }
  }, [widgets, onWidgetsChange]);

  const handleLayoutChange = (layout) => {
    if (!isEditMode) return;

    setWidgets(prevWidgets => 
      prevWidgets.map(widget => {
        const layoutItem = layout.find(item => item.i === widget.id);
        if (layoutItem) {
          return {
            ...widget,
            layout: {
              ...widget.layout,
              x: layoutItem.x,
              y: layoutItem.y,
              w: layoutItem.w,
              h: layoutItem.h
            }
          };
        }
        return widget;
      })
    );
  };

  const addWidget = (template) => {
    const newWidget = {
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: template.type,
      title: template.name,
      component: template.component,
      props: template.defaultProps || {},
      config: {
        refreshInterval: 30000,
        showHeader: true,
        exportable: true,
        resizable: true
      },
      layout: {
        ...template.defaultLayout,
        x: 0,
        y: 0
      }
    };

    const occupiedPositions = widgets.map(w => ({
      x: w.layout.x,
      y: w.layout.y,
      w: w.layout.w,
      h: w.layout.h
    }));

    let bestPosition = { x: 0, y: 0 };
    let found = false;

    for (let y = 0; y < 20 && !found; y++) {
      for (let x = 0; x <= 12 - newWidget.layout.w && !found; x++) {
        const conflicts = occupiedPositions.some(pos => 
          x < pos.x + pos.w && x + newWidget.layout.w > pos.x &&
          y < pos.y + pos.h && y + newWidget.layout.h > pos.y
        );
        
        if (!conflicts) {
          bestPosition = { x, y };
          found = true;
        }
      }
    }

    newWidget.layout.x = bestPosition.x;
    newWidget.layout.y = bestPosition.y;

    setWidgets(prev => [...prev, newWidget]);
    setShowWidgetLibrary(false);
  };

  const removeWidget = (widgetId) => {
    setWidgets(prev => prev.filter(w => w.id !== widgetId));
    setSelectedWidget(null);
  };

  const duplicateWidget = (widgetId) => {
    const widget = widgets.find(w => w.id === widgetId);
    if (!widget) return;

    const newWidget = {
      ...widget,
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title: `${widget.title} (Copy)`,
      layout: {
        ...widget.layout,
        x: Math.min(widget.layout.x + 1, 12 - widget.layout.w),
        y: widget.layout.y + 1
      }
    };

    setWidgets(prev => [...prev, newWidget]);
  };

  const updateWidgetSettings = (widgetId, settings) => {
    setWidgets(prev => 
      prev.map(widget => 
        widget.id === widgetId 
          ? { ...widget, ...settings }
          : widget
      )
    );
  };

  const handleSave = () => {
    if (onSave) {
      onSave(widgets);
    }
    setIsEditMode(false);
  };

  const generateLayout = () => {
    return widgets.map(widget => ({
      i: widget.id,
      x: widget.layout.x,
      y: widget.layout.y,
      w: widget.layout.w,
      h: widget.layout.h,
      minW: widget.layout.minW,
      minH: widget.layout.minH,
      maxW: widget.layout.maxW,
      maxH: widget.layout.maxH,
      static: !isEditMode
    }));
  };

  const renderWidget = (widget) => {
    const WidgetComponent = widget.component;
    
    return (
      <div 
        key={widget.id}
        className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden ${
          isEditMode ? 'ring-2 ring-blue-200' : ''
        } ${selectedWidget === widget.id ? 'ring-2 ring-blue-500' : ''}`}
        onClick={() => setSelectedWidget(widget.id)}
      >
        {widget.config?.showHeader !== false && (
          <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center gap-2">
              {isEditMode && (
                <GripVerticalIcon size={16} className="text-gray-400 cursor-move" />
              )}
              <h3 className="font-medium text-gray-900 text-sm">{widget.title}</h3>
            </div>
            
            <div className="flex items-center gap-1">
              {isEditMode && (
                <>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingWidget(widget.id);
                    }}
                    variant="ghost"
                    size="sm"
                    className="p-1 text-gray-600 hover:text-gray-800 rounded-md"
                  >
                    <EditIcon size={14} />
                  </Button>
                  
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      duplicateWidget(widget.id);
                    }}
                    variant="ghost"
                    size="sm"
                    className="p-1 text-gray-600 hover:text-gray-800 rounded-md"
                  >
                    <PlusIcon size={14} />
                  </Button>
                  
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeWidget(widget.id);
                    }}
                    variant="ghost"
                    size="sm"
                    className="p-1 text-red-600 hover:text-red-800 rounded-md"
                  >
                    <TrashIcon size={14} />
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
        
        <div className="p-3">
          <WidgetComponent
            {...widget.props}
            widgetId={widget.id}
            isEditMode={isEditMode}
          />
        </div>
      </div>
    );
  };

  const renderWidgetLibrary = () => {
    const categories = Array.from(new Set(widgetTemplates.map(t => t.category)));
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowAddWidget(false)}>
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Add Widget</h2>
            <Button
              onClick={() => setShowWidgetLibrary(false)}
              variant="ghost"
              size="sm"
              className="p-2 text-gray-400 hover:text-gray-600 rounded-md"
            >
              <XIcon className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="p-4 overflow-y-auto max-h-[60vh]">
            {categories.map(category => (
              <div key={category} className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide mb-3">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {widgetTemplates
                    .filter(template => template.category === category)
                    .map(template => (
                      <div
                        key={template.id}
                        className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-sm cursor-pointer transition-all"
                        onClick={() => addWidget(template)}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="text-blue-600">
                            {template.icon}
                          </div>
                          <h4 className="font-medium text-gray-900">{template.name}</h4>
                        </div>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderWidgetEditor = () => {
    const widget = widgets.find(w => w.id === editingWidget);
    if (!widget) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setEditingWidget(null)}>
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Edit Widget</h2>
            <Button
              onClick={() => setEditingWidget(null)}
              variant="ghost"
              size="sm"
              className="p-2 text-gray-400 hover:text-gray-600 rounded-md"
            >
              <XIcon className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={widget.title}
                onChange={(e) => updateWidgetSettings(widget.id, { title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Refresh Interval (seconds)
              </label>
              <input
                type="number"
                value={(widget.config?.refreshInterval || 30000) / 1000}
                onChange={(e) => updateWidgetSettings(widget.id, {
                  config: {
                    ...widget.config,
                    refreshInterval: parseInt(e.target.value) * 1000
                  }
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={widget.config?.showHeader !== false}
                  onChange={(e) => updateWidgetSettings(widget.id, {
                    config: {
                      ...widget.config,
                      showHeader: e.target.checked
                    }
                  })}
                  className="mr-2"
                />
                Show Header
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={widget.config?.exportable !== false}
                  onChange={(e) => updateWidgetSettings(widget.id, {
                    config: {
                      ...widget.config,
                      exportable: e.target.checked
                    }
                  })}
                  className="mr-2"
                />
                Exportable
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-end gap-3 p-4 border-t border-gray-200">
            <Button
              onClick={() => setEditingWidget(null)}
              variant="outline"
              size="sm"
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setEditingWidget(null)}
              variant="primary"
              size="sm"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`${className}`}>
      {editable && (
        <div className="flex items-center justify-between mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
            {isEditMode && (
              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Edit Mode
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {isEditMode && (
              <Button
                onClick={() => setShowWidgetLibrary(true)}
                variant="primary"
                size="sm"
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <PlusIcon size={16} />
                Add Widget
              </Button>
            )}
            
            <Button
              onClick={() => setIsEditMode(!isEditMode)}
              variant={isEditMode ? 'primary' : 'outline'}
              size="sm"
              className={`flex items-center gap-2 px-3 py-2 rounded-md ${
                isEditMode
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {isEditMode ? (
                <>
                  <SaveIcon size={16} />
                  Save Layout
                </>
              ) : (
                <>
                  <SettingsIcon size={16} />
                  Edit Layout
                </>
              )}
            </Button>
            
            {isEditMode && (
              <Button
                onClick={handleSave}
                variant="primary"
                size="sm"
                className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <SaveIcon size={16} />
                Save
              </Button>
            )}
          </div>
        </div>
      )}

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: generateLayout() }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={60}
        onLayoutChange={handleLayoutChange}
        isDraggable={isEditMode}
        isResizable={isEditMode}
        margin={[16, 16]}
        containerPadding={[0, 0]}
      >
        {widgets.map(renderWidget)}
      </ResponsiveGridLayout>

      {showWidgetLibrary && renderWidgetLibrary()}
      
      {editingWidget && renderWidgetEditor()}
    </div>
  );
};