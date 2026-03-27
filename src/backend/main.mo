import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

actor {
  type ContactMessage = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
  };

  module ContactMessage {
    public func compare(message1 : ContactMessage, message2 : ContactMessage) : Order.Order {
      switch (Text.compare(message1.name, message2.name)) {
        case (#equal) { Text.compare(message1.email, message2.email) };
        case (order) { order };
      };
    };
  };

  let contactMessages = Map.empty<Principal, ContactMessage>();

  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, phone : Text, message : Text) : async () {
    let contactMessage : ContactMessage = {
      name;
      email;
      phone;
      message;
    };

    let iter = contactMessages.values();
    if (iter.find(func(existingMessage) { existingMessage.message == message }) != null) {
      Runtime.trap("Message already sent, please write a different one!");
    };
    contactMessages.add(caller, contactMessage);
  };

  public shared ({ caller }) func getAllContactMessages() : async [ContactMessage] {
    if (contactMessages.isEmpty()) {
      Runtime.trap("There are no messages yet.");
    };
    contactMessages.values().toArray().sort();
  };
};
