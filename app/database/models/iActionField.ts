/**
 * önceki aksiyonun outputları ile
 * sonraki aksiyonun inputları arasında bağlantı
 */

import { IBase } from "./iBase";

export interface IActionField extends IBase {
  name: string;
}