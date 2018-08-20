"use strict";
var Profile = (function () {
    function Profile(username, ltdmode, first_name, last_name, image, password, active, organization, mailboxes) {
        this.username = username;
        this.ltdmode = ltdmode;
        this.first_name = first_name;
        this.last_name = last_name;
        this.image = image;
        this.password = password;
        this.active = active;
        this.organization = organization;
        this.mailboxes = mailboxes;
    }
    Profile.EMPTY_MODEL = {
        username: '',
        ltdmode: false,
        first_name: '',
        last_name: '',
        image: '',
        password: '',
        active: true,
        organization: [],
        mailboxes: []
    };
    return Profile;
}());
exports.Profile = Profile;
