"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _jsCookie = require("js-cookie");

var _jsCookie2 = _interopRequireDefault(_jsCookie);

var _isomorphicUnfetch = require("isomorphic-unfetch");

var _isomorphicUnfetch2 = _interopRequireDefault(_isomorphicUnfetch);

var _Api = require("../components/Api");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tableStyle = {
  margin: "20 0"
};

var tableRowStyle = {
  display: "flex",
  "line-height": 24,
  "white-space": "nowrap",
  margin: "10 0",
  padding: 10,
  background: "#ffffff",
  border: "1 solid #e3e3e3"
};

var Index = function (_React$Component) {
  (0, _inherits3.default)(Index, _React$Component);

  function Index() {
    (0, _classCallCheck3.default)(this, Index);

    return (0, _possibleConstructorReturn3.default)(this, (Index.__proto__ || (0, _getPrototypeOf2.default)(Index)).apply(this, arguments));
  }

  (0, _createClass3.default)(Index, [{
    key: "render",
    value: function render() {
      var investments = this.props.investments;

      return _react2.default.createElement(_MyLayout2.default, null, _react2.default.createElement("div", { style: tableStyle }, investments.map(function (item) {
        return _react2.default.createElement("div", { key: item._id, style: tableRowStyle }, _react2.default.createElement("span", { style: { width: "40%" } }, item.name), _react2.default.createElement("span", { style: { width: "20%" } }, item.type), _react2.default.createElement("span", { style: { width: "20%" } }, item.holder), _react2.default.createElement("span", { style: { width: "20%" } }, item.due_date));
      })));
    }
  }]);

  return Index;
}(_react2.default.Component);

Index.getInitialProps = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref) {
    var req = _ref.req;
    var res, data;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _Api.getInvestments)(req.cookies["token"]);

          case 2:
            res = _context.sent;
            data = res.data;
            return _context.abrupt("return", {
              investments: data
            });

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = Index;