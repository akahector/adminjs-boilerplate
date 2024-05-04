import { Box, DropZone, Label } from '@adminjs/design-system';
import React from 'react';
const UploadMultipleFileS = (props) => {
    const { property, onChange } = props;
    const handleDropZoneChange = (files) => {
        onChange(property.name, files);
    };
    return (React.createElement(Box, null,
        React.createElement(Label, null, "Product Image"),
        React.createElement(DropZone, { onChange: handleDropZoneChange, multiple: true })));
};
export default UploadMultipleFileS;
