import { useCallback } from 'react';
import type { RemirrorJSON } from 'remirror';
import { OnChangeJSON } from '@remirror/react';
import { WysiwygEditor } from '@remirror/react-editors/wysiwyg';

const STORAGE_KEY = 'remirror-editor-content';

const App: React.FC = () => {
  const handleEditorChange = useCallback((json: RemirrorJSON) => {
    // Store the JSON in localstorage
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(json));
  }, []);

  return <MyEditor onChange={handleEditorChange} />;
};

interface MyEditorProps {
  onChange: (json: RemirrorJSON) => void;
}

const MyEditor: React.FC<MyEditorProps> = ({ onChange }) => {
  return (
    <div style={{ padding: 16 }}>
      <WysiwygEditor placeholder='Enter text...'>
        <OnChangeJSON onChange={onChange} />
      </WysiwygEditor>
    </div>
  );
};

export default App;