"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const UserApi_1 = require("./Firebase/api/database/UserApi");
function TestQueries() {
    const { data, status } = (0, react_query_1.useQuery)({
        queryKey: ["test query"],
        queryFn: () => (0, UserApi_1.getUserById)("Vm4MlX4a5havyADcmomHsSWQ2tg2"),
    });
    const fileRef = (0, react_1.useRef)();
    // const { mutate, status, data } = useMutation({
    //   mutationFn: () =>
    //     uploadUserProfilePhoto(
    //       "Vm4MlX4a5havyADcmomHsSWQ2tg2",
    //       fileRef?.current?.files?.[0]!
    //     ),
    // });
    if (status === "loading")
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});
    if (status === "success") {
        console.log(data);
    }
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("p", { children: "data" }) }));
}
exports.default = TestQueries;
