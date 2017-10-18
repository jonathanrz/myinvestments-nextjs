"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _MyLayout = require("../components/MyLayout.js");

var _MyLayout2 = _interopRequireDefault(_MyLayout);

var _index = require("next/dist/lib/router/index.js");

var _index2 = _interopRequireDefault(_index);

var _jsCookie = require("js-cookie");

var _jsCookie2 = _interopRequireDefault(_jsCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Index = function (_React$Component) {
  (0, _inherits3.default)(Index, _React$Component);

  function Index(props) {
    (0, _classCallCheck3.default)(this, Index);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Index.__proto__ || (0, _getPrototypeOf2.default)(Index)).call(this, props));

    _this.state = { token: "" };

    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Index, [{
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({ token: event.target.value });
    }
  }, {
    key: "handleSubmit",
    value: function handleSubmit(event) {
      _jsCookie2.default.set("token", this.state.token);
      _index2.default.push("/");
      event.preventDefault();
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(_MyLayout2.default, null, _react2.default.createElement("form", { onSubmit: this.handleSubmit }, _react2.default.createElement("label", null, "Token:", _react2.default.createElement("input", {
        type: "text",
        name: "token",
        value: this.state.token,
        onChange: this.handleChange
      })), _react2.default.createElement("input", { type: "submit", value: "Submit" })));
    }
  }]);

  return Index;
}(_react2.default.Component);

exports.default = Index;