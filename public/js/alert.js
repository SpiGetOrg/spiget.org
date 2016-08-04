var Alert = {
    elements: {
        container: $("#footer_alert"),
        text: $("#footer_alert_value")
    }
};

Alert.alertType = function (type) {
    alert = Alert.elements.container;

    alert.removeClass(function (index, clazz) {
        //http://stackoverflow.com/questions/14322225/using-jquery-removeclass-to-remove-all-classes-but-one
        return clazz.replace(/(^|\s)+alert\s+/, '');
    });
    alert.addClass("alert-" + type);
};

Alert.alertValue = function (value) {
    alert = Alert.elements.text;
    alert.empty();
    alert.text(value);
};

Alert.showAlert = function () {
    Alert.elements.container.fadeIn();
};

Alert.hideAlert = function () {
    Alert.elements.container.fadeOut();
};

//Combined method of the above
Alert.alert = function (type, value, visible) {
    Alert.alertType(type);
    Alert.alertValue(value);

    if (visible) {
        Alert.showAlert();
    } else {
        Alert.hideAlert();
    }
};

$(document).on("click", "#footer_alert .close", function (e) {
    e.preventDefault();
    Alert.hideAlert();
});
