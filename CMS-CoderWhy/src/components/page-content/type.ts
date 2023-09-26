export interface IContentConfig {
  pageName: string
  header?: {
    title?: string
    btnTitle?: string
  }
  propsList: any[]
  childrenTree?: any
}

export interface IContentProps {
  contentConfig: IContentConfig
}
