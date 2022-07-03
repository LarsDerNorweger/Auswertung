import { api } from './native.js'
import { sleep } from './helper.js'

export class SavaManager {
  constructor(filename: string) {
    this.m_filename = filename
  }

  async saveData(data: object, holdBack = true) {
    if (!holdBack) {
      this.m_save()
      return
    }

    this.m_buffer = data

    if (this.m_aktiveTimer)
      return
    this.m_aktiveTimer = true
    await sleep(5000)
    this.m_save()

  }

  readData(): object { return JSON.parse(api.readFromFile(this.m_filename)) }

  private m_save() {
    this.m_aktiveTimer = false
    console.log("save")
    api.writeToFile(this.m_filename, JSON.stringify(this.m_buffer))
  }

  private m_aktiveTimer = false
  private m_filename: string
  private m_buffer: object
}