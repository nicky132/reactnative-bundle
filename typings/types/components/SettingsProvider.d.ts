declare namespace AppSettings {
  /** app配置 */
  export interface ISettings {
    /** theme 系统主题 light or dark */
    theme: string;
    /**
     * - primary：用于着色各种元素的应用程序的主要颜色。通常你会想用你的品牌颜色来做这个。
     * - text：各种元素的文本颜色。
     * - background：各种背景的颜色，例如屏幕的背景颜色。
     * - card：卡片类元素的背景颜色，如标题、制表符栏等。
     */
    // border（string）：边框的颜色，例如标题边框、制表符栏边框等。
    // notification（string）：Tab Navigator徽章的颜色。
    colors: {
      primary: string;
      text: string;
      background: string;
      card: string;
    };
    insets: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    } | null;
  }
}
