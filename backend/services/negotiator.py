"""
This module implements a simple negotiation algorithm simulating offers and counter-offers
between a buyer and a seller. It's designed to be integrated into an e-commerce platform
where prices can be negotiated.
"""

class NegotiationAgent:
    """
    Base class for a negotiating entity (Buyer or Seller).
    Defines core properties and behaviors common to both.
    """
    def __init__(self, name: str, target_price: float, limit_price: float, style: str = "balanced"):
        """
        Initializes a NegotiationAgent.
        :param name: Identifier for the agent.
        :param target_price: The agent's initial or current desired price.
        :param limit_price: The agent's absolute acceptable price boundary (e.g., max for buyer, min for seller).
        :param style: Defines the agent's negotiation behavior (e.g., "aggressive", "patient").
        """
        self.name = name
        self.target = target_price
        self.limit = limit_price
        self.style = style

    def concession_rate(self) -> float:
        """
        Determines the rate at which the agent is willing to concede its offer.
        This rate influences how quickly the agent moves towards the other party's price.
        """
        if self.style == "aggressive":
            return 0.02  # Concedes very little
        if self.style == "patient":
            return 0.05
        if self.style == "friendly":
            return 0.10 # Concedes more
        return 0.05 # Default for "balanced" or unrecognized styles

    def update_target(self, new_price: float):
        """
        Dynamically updates the agent’s current offer target.
        This is typically used in a continuous negotiation to adjust the agent's stance.
        """
        self.target = new_price

    def set_price(self, new_price: float):
        """
        Allows an external interface (e.g., UI) to directly set a new round price for the agent.
        """
        self.target = new_price


class Buyer(NegotiationAgent):
    """
    Represents the buyer in the negotiation.
    The buyer aims to decrease the price and will make offers towards the seller's target.
    """
    def make_offer(self, seller_offer: float) -> float:
        """
        Calculates the buyer's next offer based on the seller's last offer.
        The buyer moves their offer towards the seller's price, limited by their own maximum acceptable price.
        :param seller_offer: The last offer made by the seller.
        :return: The buyer's new calculated offer.
        """
        # Calculate how much the buyer should move their offer
        # The move is proportional to the difference between seller's offer and buyer's target,
        # scaled by the buyer's concession rate.
        move = (seller_offer - self.target) * self.concession_rate()
        
        # The new offer is the current target plus the calculated move.
        offer = self.target + move
        
        # Ensure the buyer's offer does not exceed their limit price (max price they are willing to pay).
        return min(offer, self.limit)


class Seller(NegotiationAgent):
    """
    Represents the seller in the negotiation.
    The seller aims to maintain a higher price and will make counter-offers towards the buyer's offer.
    """
    def counter_offer(self, buyer_offer: float) -> float:
        """
        Calculates the seller's next counter-offer based on the buyer's last offer.
        The seller moves their offer towards the buyer's price, limited by their own minimum acceptable price.
        :param buyer_offer: The last offer made by the buyer.
        :return: The seller's new calculated counter-offer.
        """
        # Calculate how much the seller should move their counter-offer
        # The move is proportional to the difference between seller's target and buyer's offer,
        # scaled by the seller's concession rate.
        move = (self.target - buyer_offer) * self.concession_rate()
        
        # The new counter-offer is the current target minus the calculated move.
        offer = self.target - move
        
        # Ensure the seller's offer does not go below their limit price (minimum price they are willing to accept).
        return max(offer, self.limit)


class NegotiationEngine:
    """
    Manages the overall negotiation process between a Buyer and a Seller.
    It runs the negotiation round by round, checking for deal closure.
    """
    def __init__(self, buyer: Buyer, seller: Seller):
        """
        Initializes the NegotiationEngine.
        :param buyer: The Buyer agent participating in the negotiation.
        :param seller: The Seller agent participating in the negotiation.
        """
        self.buyer = buyer
        self.seller = seller
        self.round = 0          # Tracks the current negotiation round
        self.finished = False   # True if a deal has been reached
        self.final_price = None # Stores the agreed price once negotiation concludes

    def check_closure(self, buyer_offer: float, seller_offer: float) -> bool:
        """
        Determines if a deal can be closed.
        A deal is reached if the buyer's offer is greater than or equal to the seller's offer.
        :param buyer_offer: The current offer from the buyer.
        :param seller_offer: The current offer from the seller.
        :return: True if a deal can be made, False otherwise.
        """
        if buyer_offer < self.seller.limit:
            return False
        return buyer_offer >= seller_offer

    def step(self) -> dict:
        """
        Executes ONE round of negotiation.
        This method should be called repeatedly by the UI or an external process
        until the negotiation is finished.
        :return: A dictionary containing the current state of the negotiation,
                 including offers, round number, and if a deal was reached.
        """

        if self.finished:
            # If negotiation already finished, return the final result.
            return {
                "message": "Negotiation already finished.",
                "final_price": self.final_price,
                "round": self.round,
                "finished": True
            }

        self.round += 1  # Increment round counter for each step

        # --- Buyer's Turn ---
        # Buyer makes an offer based on the seller's current target.
        buyer_offer = self.buyer.make_offer(self.seller.target)

        # Check for immediate closure after buyer's offer.
        # This handles cases where the buyer's new offer meets or exceeds the seller's current target.
        if self.check_closure(buyer_offer, self.seller.target):
            self.finished = True
            self.final_price = round(buyer_offer, 2)
            return {
                "message": f"Deal reached at ₦{self.final_price:.2f}",
                "final_price": self.final_price,
                "round": self.round,
                "finished": True
            }

        # --- Seller's Turn ---
        # Seller makes a counter-offer based on the buyer's last offer.
        seller_offer = self.seller.counter_offer(buyer_offer)

        # Check for closure after seller's counter-offer.
        # This handles cases where the buyer's offer (from this round) meets or exceeds the seller's new counter-offer.
        if self.check_closure(buyer_offer, seller_offer):
            self.finished = True
            self.final_price = round(seller_offer, 2)
            return {
                "message": f"Deal reached at ₦{self.final_price:.2f}",
                "final_price": self.final_price,
                "round": self.round,
                "finished": True
            }

        # --- No Closure Yet ---
        # If no deal is reached in this round, return the current offers and state.
        return {
            "message": f"Round {self.round} complete.",
            "final_price": self.seller.target,
            "round": self.round,
            "finished": True
        }

# --- Example Usage (commented out for production) ---
# This section demonstrates how to initialize and run the negotiation engine.
# buyer  = Buyer("Oscar", 10000, 20000, "friendly")
# seller = Seller("Market Woman", 30000, 18000, "friendly")

# engine = NegotiationEngine(buyer, seller)

# # In a real application, the UI would typically interact with these methods
# # UI passes new values before stepping (e.g., if a user manually changes their offer)
# # engine.buyer.set_price(new_buyer_price)
# # engine.seller.set_price(new_seller_price)

# # result = engine.step()
# # print(result)