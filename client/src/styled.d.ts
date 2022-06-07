// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    green: string;
    yellow: string;
    light: string;
    dark: string;
    pink: string;
  }
}
