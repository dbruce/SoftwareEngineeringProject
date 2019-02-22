var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CustomerView = function (_React$Component) {
    _inherits(CustomerView, _React$Component);

    function CustomerView(props) {
        _classCallCheck(this, CustomerView);

        var _this = _possibleConstructorReturn(this, (CustomerView.__proto__ || Object.getPrototypeOf(CustomerView)).call(this, props));

        _this.state = {
            branches: [],
            services: [],
            appointmentSlots: []
        };
        return _this;
    }

    _createClass(CustomerView, [{
        key: 'loadData',
        value: function loadData() {}
    }, {
        key: 'scheduleAppointment',
        value: function scheduleAppointment() {
            // Send the schedule request
            $.ajax({
                type: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                url: '/api/appointments/add',
                data: JSON.stringify({
                    calendarId: 60,
                    time: "12:00",
                    branchId: 1,
                    managerId: 1,
                    customerId: 1,
                    serviceId: 1
                })
            });
        }
    }, {
        key: 'render',
        value: function render() {
            return React.createElement(
                'div',
                null,
                React.createElement(
                    'h1',
                    null,
                    'What can we help you with?'
                ),
                React.createElement(
                    'p',
                    null,
                    'Choose as many topics as you need.'
                ),
                React.createElement(
                    'div',
                    null,
                    React.createElement(
                        'button',
                        null,
                        'Checking Account'
                    ),
                    React.createElement(
                        'button',
                        null,
                        'Savings Account'
                    ),
                    React.createElement(
                        'button',
                        null,
                        'CDs/Money Market Accounts'
                    ),
                    React.createElement(
                        'button',
                        null,
                        'Student Banking'
                    ),
                    React.createElement(
                        'button',
                        null,
                        'Auto Loans'
                    ),
                    React.createElement(
                        'button',
                        null,
                        'Home Equity'
                    ),
                    React.createElement(
                        'button',
                        null,
                        'Mortgage'
                    ),
                    React.createElement(
                        'button',
                        null,
                        'Student Loans'
                    ),
                    React.createElement(
                        'button',
                        null,
                        'Saving for Retirement'
                    ),
                    React.createElement(
                        'button',
                        null,
                        'Investment Account'
                    ),
                    React.createElement(
                        'button',
                        null,
                        'Credit Card'
                    ),
                    React.createElement(
                        'button',
                        null,
                        'Other'
                    )
                ),
                React.createElement('input', { type: 'submit', value: 'Schedule Appointment', id: 'scheduleButton', onClick: this.scheduleAppointment.bind(this) })
            );
        }
    }]);

    return CustomerView;
}(React.Component);

ReactDOM.render(React.createElement(CustomerView, null), document.getElementById('root'));