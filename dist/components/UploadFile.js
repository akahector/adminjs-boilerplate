import { Box, DropZone, Label } from '@adminjs/design-system';
import React from 'react';
const UploadFile = (props) => {
    const { property, onChange } = props;
    const handleDropZoneChange = (files) => {
        onChange(property.name, files[0]);
    };
    return (React.createElement(Box, null,
        React.createElement(Label, null, "Product Image"),
        React.createElement(DropZone, { onChange: handleDropZoneChange })));
};
export default UploadFile;
