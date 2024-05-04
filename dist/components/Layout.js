import React from 'react';
import { BaseLayout, ViewHelpers, Box, Text } from '@adminjs/design-system';
const CustomLayout = (props) => {
    return (React.createElement(BaseLayout, { ...props },
        React.createElement(Box, null,
            React.createElement(ViewHelpers.View, { name: "logo", component: (props) => (React.createElement(Text, null,
                    React.createElement("img", { src: "/path/to/your/logo.png", alt: "Your App Logo" }))) }),
            React.createElement(ViewHelpers.View, { name: "header" }),
            React.createElement(ViewHelpers.View, { name: "body" }))));
};
export default CustomLayout;
