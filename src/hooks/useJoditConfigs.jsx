import { useMemo, useRef } from 'react';

const useJoditConfigs = () => {
    const editor = useRef(null);
    const options = [
        "bold",
        "italic",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "|",
        "outdent",
        "indent",
        "align",
        "|",
        "hr",
        "|",
        "fullsize",
        "brush",
        "|",
        "table",
        "link",
        "|",
        "undo",
        "redo",
      ];
      const config = useMemo(
        () => ({
          readonly: false,
          placeholder: "",
          defaultActionOnPaste: "insert_as_html",
          defaultLineHeight: 1.5,
          enter: "br",
          buttons: options,
          buttonsMD: options,
          buttonsSM: options,
          buttonsXS: options,
          statusbar: false,
          sizeLG: 900,
          sizeMD: 700,
          sizeSM: 400,
          toolbarAdaptive: false,
        }),
        []
      );
return {editor,config}
}

export default useJoditConfigs