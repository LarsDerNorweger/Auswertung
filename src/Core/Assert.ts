/*
    Test 2022

    Authors: Colin Böttger
*/

export class Assert
{
  static areEqual(value: number, assumtion: number): void;
  static areEqual(value: string, assumtion: string): void;
  static areEqual(value: boolean, assumtion: boolean): void;
  static areEqual(value: any, assumtion: any): void
  {
    this.testnumber++;
    if(assumtion !== value)
      throw new Error(`Assert Failed \n\t value: ${value}\n\t expected:${assumtion} \n\t testnumber:${this.testnumber}`);
  }

  static end(message?: string)
  {
    if(message)
      console.debug(`${message}\n\t${this.testnumber} Tests ended successfull`);
    else
      console.debug(`${this.testnumber} Tests ended successfull`);
    this.testnumber = 0;
  }

  private Assert() { return; }
  static testnumber: number = 0;
}
;
