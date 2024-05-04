import React from 'react';
import { Box, Text, Button, Input } from '@adminjs/design-system';
const CustomLogin = () => {
    return (React.createElement(Box, null,
        React.createElement(Text, { mb: "lg" },
            React.createElement("h2", null, "Welcome to Your App"),
            React.createElement("p", null, "Please enter your credentials to log in.")),
        React.createElement(Box, null,
            React.createElement(Input, { label: "Email", name: "email" }),
            React.createElement(Input, { label: "Password", name: "password", type: "password" }),
            React.createElement(Button, { variant: "primary" }, "Log In"))));
};
export default CustomLogin;
