"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _MyLayout = require("../components/MyLayout.js");

var _MyLayout2 = _interopRequireDefault(_MyLayout);

var _link = require("next/dist/lib/link.js");

var _link2 = _interopRequireDefault(_link);

var _isomorphicUnfetch = require("isomorphic-unfetch");

var _isomorphicUnfetch2 = _interopRequireDefault(_isomorphicUnfetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = "/Users/jonathan/Developer/personal/myinvestments-nextjs/pages/index.js?entry";


var Index = function Index(props) {
  return _react2.default.createElement(_MyLayout2.default, {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, _react2.default.createElement("h1", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, "Batman TV Shows"), _react2.default.createElement("ul", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, props.shows.map(function (_ref) {
    var show = _ref.show;
    return _react2.default.createElement("li", { key: show.id, __source: {
        fileName: _jsxFileName,
        lineNumber: 10
      }
    }, _react2.default.createElement(_link2.default, { as: "/p/" + show.id, href: "/post?id=" + show.id, __source: {
        fileName: _jsxFileName,
        lineNumber: 11
      }
    }, _react2.default.createElement("a", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 12
      }
    }, show.name)));
  })));
};

Index.getInitialProps = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
  var res, data;
  return _regenerator2.default.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _isomorphicUnfetch2.default)("https://api.tvmaze.com/search/shows?q=batman");

        case 2:
          res = _context.sent;
          _context.next = 5;
          return res.json();

        case 5:
          data = _context.sent;

          console.log("Show data fetched. Count: " + data.length);

          return _context.abrupt("return", {
            shows: data
          });

        case 8:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));

exports.default = Index;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhZ2VzL2luZGV4LmpzIl0sIm5hbWVzIjpbIkxheW91dCIsIkxpbmsiLCJmZXRjaCIsIkluZGV4IiwicHJvcHMiLCJzaG93cyIsIm1hcCIsInNob3ciLCJpZCIsIm5hbWUiLCJnZXRJbml0aWFsUHJvcHMiLCJyZXMiLCJqc29uIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJsZW5ndGgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBWTs7OztBQUNuQixBQUFPOzs7O0FBQ1AsQUFBTzs7Ozs7Ozs7O0FBRVAsSUFBTSxRQUFRLFNBQVIsQUFBUSxhQUFBO3lCQUNaLEFBQUM7O2dCQUFEO2tCQUFBLEFBQ0U7QUFERjtBQUFBLEdBQUEsa0JBQ0UsY0FBQTs7Z0JBQUE7a0JBQUE7QUFBQTtBQUFBLEtBREYsQUFDRSxBQUNBLG9DQUFBLGNBQUE7O2dCQUFBO2tCQUFBLEFBQ0c7QUFESDtBQUFBLFdBQ0csQUFBTSxNQUFOLEFBQVksSUFBSSxnQkFBQTtRQUFBLEFBQUcsWUFBSCxBQUFHOzJCQUNsQixjQUFBLFFBQUksS0FBSyxLQUFULEFBQWM7a0JBQWQ7b0JBQUEsQUFDRTtBQURGO0tBQUEsa0JBQ0UsQUFBQyxnQ0FBSyxZQUFVLEtBQWhCLEFBQXFCLElBQU0sb0JBQWtCLEtBQTdDLEFBQWtEO2tCQUFsRDtvQkFBQSxBQUNFO0FBREY7dUJBQ0UsY0FBQTs7a0JBQUE7b0JBQUEsQUFBSTtBQUFKO0FBQUEsWUFIVyxBQUNmLEFBQ0UsQUFDRSxBQUFTO0FBUFAsQUFDWixBQUVFLEFBQ0c7QUFKUDs7QUFlQSxNQUFBLEFBQU0sMkZBQWtCLG1CQUFBO1dBQUE7Z0VBQUE7Y0FBQTt1Q0FBQTthQUFBOzBCQUFBO2lCQUNKLGlDQURJLEFBQ0osQUFBTTs7YUFBbEI7QUFEZ0IseUJBQUE7MEJBQUE7aUJBRUgsSUFGRyxBQUVILEFBQUk7O2FBQWpCO0FBRmdCLDBCQUl0Qjs7a0JBQUEsQUFBUSxtQ0FBaUMsS0FKbkIsQUFJdEIsQUFBOEM7OzttQkFKeEIsQUFNZixBQUNFO0FBREYsQUFDTDs7YUFQb0I7YUFBQTswQkFBQTs7QUFBQTtjQUFBO0FBQXhCLEFBV0E7O2tCQUFBLEFBQWUiLCJmaWxlIjoiaW5kZXguanM/ZW50cnkiLCJzb3VyY2VSb290IjoiL1VzZXJzL2pvbmF0aGFuL0RldmVsb3Blci9wZXJzb25hbC9teWludmVzdG1lbnRzLW5leHRqcyJ9