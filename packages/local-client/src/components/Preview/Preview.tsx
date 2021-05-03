import { FC, useEffect, useRef } from "react";
import "./Preview.css";

const html = `
<html>
  <head>
    <style>html {background-color: white;}</style>
  </head>
    <div id='root'></div>
    <script>
      const handleError = (error) => {
        const root = document.querySelector('#root');
        root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
        console.error(error);
      };
      window.addEventListener('error', (event) => {
        event.preventDefault();
        handleError(event.error);
      });
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        }
        catch(error) {
          handleError(error);
        }
      }, false)
    </script>
  </body>
</html>
`;

type PreviewProps = {
  code: string;
  err: string;
};

const Preview: FC<PreviewProps> = ({ code, err }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    // reset the content of the iframe before executing the code
    iframeRef.current.srcdoc = html;

    // post compiled code to iframe
    setTimeout(() => {
      if (!iframeRef.current) return;
      iframeRef.current.contentWindow?.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframeRef}
        title="preview"
        sandbox="allow-scripts allow-modals"
        srcDoc={html}
      />
      {err && <div className="preview-error">{err}</div>}
    </div>
  );
};

export default Preview;
