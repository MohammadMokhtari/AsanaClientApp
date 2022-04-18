export interface ModalConfig {
  headerTitle: string;
  shouldClose?(): Promise<boolean> | boolean;
  onClose?(): Promise<boolean> | boolean;
}
