// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = -1;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
}

// extra function+data for populating our address book ---
AddressBook.prototype.addContacts = function() {
  const contacts = arguments
  for (contact of contacts) {
    this.addContact(contact)
  }
}
contact0 = new Contact({ firstName: 'Jeremy', lastName: 'Banka', emailAddress: { home: 'jeremy@email.com' } })
contact1 = new Contact({ firstName: 'Cristina', lastName: 'Plesa', physicalAddress: "Cristina's House" })
contact2 = new Contact({ firstName: 'Brendan', lastName: 'Eich', phoneNumber: '555-555-5555' })
// -------------------------------------------------------


AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
}

// Business Logic for Contacts ---------
function Contact({
  firstName, 
  lastName, 
  phoneNumber, 
  emailAddress,
  physicalAddress
}) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.emailAddress = {};
  this.emailAddress.home = emailAddress?.home;
  this.emailAddress.work = emailAddress?.work;
  this.physicalAddress = physicalAddress;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
let addressBook = new AddressBook();
addressBook.addContacts(contact0, contact1, contact2)

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    htmlForContactInfo += `<li id='${contact.id}'>${contact.firstName} ${contact.lastName}</li>`;
  });
  contactsList.html(htmlForContactInfo);
};

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".home-email-address").html(contact.emailAddress.home);
  $(".work-email-address").html(contact.emailAddress.work);
  $(".physical-address").html(contact.physicalAddress);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append(`<button class='deleteButton' id='${contact.id}'>Delete</button>`);
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  // Code below here is new!
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

$(document).ready(function() {
  displayContactDetails(addressBook);
  attachContactListeners();
  const newContactUnusedEmails = ['work', 'home']

  $("button#add-email").click(function(event) {
    newContactUnusedEmails.pop()
  })
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedHomeEmailAddress = $("input#new-home-email-address").val();
    const inputtedWorkEmailAddress = $("input#new-work-email-address").val();
    const inputtedPhysicalAddress = $("input#new-physical-address").val();

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-home-email-address").val("");
    $("input#new-work-email-address").val("");
    $("input#new-physical-address").val("");

    let newContact = new Contact({
      firstName: inputtedFirstName, 
      lastName: inputtedLastName,
      phoneNumber: inputtedPhoneNumber,
      emailAddress: {
        home: inputtedHomeEmailAddress,
        work: inputtedWorkEmailAddress,
      },
      physicalAddress: inputtedPhysicalAddress
    });
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});




// // Example for adding contacts to AddressBook in console:
// //let addressBook = new AddressBook();
// let contact = new Contact("Ada", "Lovelace", "503-555-0100");
// let contact2 = new Contact("Grace", "Hopper", "503-555-0199");
// addressBook.addContact(contact);
// addressBook.addContact(contact2);

// Then Run:
// addressBook;
// addressBook.contacts;
// addressBook.contacts["Ada"];
// addressBook.contacts["Ada"].phoneNumber

// Example for finding contact info based on entering Contact's id:
// Run:
// addressBook.findContact(2);
// It will return:
// Contact {firstName: "Grace", lastName: "Hopper", phoneNumber: "503-555-0199", id: 2}

// Example for deleting contacts through our new deleteContact method:
// let addressBook = new AddressBook();
// let contact = new Contact("Ada", "Lovelace", "503-555-0100");
// let contact2 = new Contact("Grace", "Hopper", "503-555-0199");
// addressBook.addContact(contact);
// addressBook.addContact(contact2);
// addressBook.deleteContact(contact);
// addressBook.contacts;