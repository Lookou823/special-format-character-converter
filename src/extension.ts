// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
function getSplitText(text: string): string[] {
  const reg = /-/g;
  let operateText = text;
  if (text.includes("-")) {
    operateText = text.replace(reg, " ");
  }
  if (operateText.includes(" ")) {
    return operateText.split(" ");
  }
  return [];
}

function firstUpperCase(str: string) {
  return str
    .toLowerCase()
    .replace(/( |^)[a-z]/g, (letter: string) => letter.toUpperCase());
}
function getPascal(textList: string[]) {
  return textList.map((word) => firstUpperCase(word)).join("");
}
function changeText(text: string) {
  const splitText = getSplitText(text);
  if (
    splitText.length > 1 &&
    ["c", "l", "u", "uc", "p"].includes(splitText[0])
  ) {
    const flag = splitText[0];
    const content = splitText.slice(1, splitText.length);
    switch (flag) {
      case "c":
        return text.toUpperCase();
      case "l":
        return text.toLowerCase();
      case "u":
        return content.join("_").toLowerCase();
      case "uc":
        return content.join("_").toUpperCase();
      case "p":
        return getPascal(content);
      default:
        return text;
    }
  } else {
    return text.toUpperCase();
  }
}

function getModalCode(text: string) {
  switch (text) {
    case "mwf":
      return `function ModalButton() {
        const [form] = Form.useForm();
        const [open, setOpen] = useState(false);
        const [loading, setLoading] = useState(false);
        const showModal = () => {
          setOpen(true);
        };
        const closeModal = () => {
          setOpen(false);
        };
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                showModal();
              }}
            >
              Click Me
            </Button>
            <Modal
              destroyOnClose
              title="ModalDemo"
              open={open}
              okButtonProps={{ loading }}
              okText="Submit"
              onCancel={() => {
                closeModal();
              }}
              onOk={() => {
                form.validateFields().then(values => {
                  setLoading(true);
                  // Attempting to mimic asynchronous behavior
                  setTimeout(() => {
                    setLoading(false);
                    closeModal();
                  }, 1000);
                });
              }}
            >
              <Form form={form} preserve={false} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                <Form.Item label="Description" name="description">
                  <Input style={{ width: 216 }} />
                </Form.Item>
              </Form>
            </Modal>
          </>
        );
      }`;
    case "pm":
      return `function ModalButton() {
        const [open, setOpen] = useState(false);
      
        const showModal = () => {
          setOpen(true);
        };
        const closeModal = () => {
          setOpen(false);
        };
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                showModal();
              }}
            >
              Click Me
            </Button>
            <Modal
              title="ModalDemo"
              open={open}
              okText="Submit"
              onCancel={() => {
                closeModal();
              }}
              onOk={() => {
                closeModal();
              }}
            >
              <>children</>
            </Modal>
          </>
        );
      }`;
    case "dwf":
      return `export function BasicDrawer() {
        const [open, setOpen] = useState(false);
        const [loading, setLoading] = useState(false);
        const [form] = Form.useForm();
        const showDrawer = () => {
          setOpen(true);
        };
      
        const onClose = () => {
          setOpen(false);
        };
      
        const onConfirm = () => {
          form.validateFields().then(values => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              setOpen(false);
            }, 1000);
          });
        };
        return (
          <>
            <Button type="primary" onClick={showDrawer}>
              Click Me
            </Button>
            <Drawer
              title="BasicDrawer"
              placement="right"
              size="large"
              open={open}
              extra={
                <Space>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button type="primary" loading={loading} onClick={onConfirm}>
                    Confirm
                  </Button>
                </Space>
              }
              onClose={onClose}
            >
              <Form form={form} labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[{ required: true, message: 'Description is required' }]}
                >
                  <Input style={{ width: 216 }} />
                </Form.Item>
              </Form>
            </Drawer>
          </>
        );
      }
      `;
    case "pd":
      return `export function BasicDrawer() {
        const [open, setOpen] = useState(false);
      
        const showDrawer = () => {
          setOpen(true);
        };
      
        const onClose = () => {
          setOpen(false);
        };
      
        const onConfirm = () => {
          setOpen(false);
        };
        return (
          <>
            <Button type="primary" onClick={showDrawer}>
              Click Me
            </Button>
            <Drawer
              title="BasicDrawer"
              placement="right"
              size="large"
              open={open}
              extra={
                <Space>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button type="primary" onClick={onConfirm}>
                    Confirm
                  </Button>
                </Space>
              }
              onClose={onClose}
            >
              <p>Some contents...</p>
            </Drawer>
          </>
        );
      }
      `;
    default:
      return text;
  }
}
export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand(
      "special-format-character-converter.transform",
      () => {
        let editor = vscode.window.activeTextEditor;
        if (!editor) {
          return; // No open text editor
        }
        const selection = editor.selection;
        let text = editor.document.getText(selection);
        editor.edit((builder) => {
          if (["mwf", "pm", "pd"].includes(text)) {
            builder.replace(selection, getModalCode(text));
          } else {
            builder.replace(selection, changeText(text));
          }
        });
      }
    )
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
