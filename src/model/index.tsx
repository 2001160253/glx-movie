export interface Film {
  id:  string ,
  slug: string,
  name: string,
  subName: string,
  description: any,
  trailer: string,
  age: string,
  duration: null,
  views: number,
  status: number,
  startdate: string,
  enddate: string,
  previewId: null,
  reviewId: null,
  seoId: string,
  imageLandscape: string,
  imagePortrait: string,
  imageLandscapeMobile: string,
  point: number,
  totalVotes: number,
  imageUrls: string,
  vistaName: string,
  dates:Array<dates>,
  version: string,
}
export interface description{
  __html: any
}
export interface dates{

  showDate:string,
  dayOfWeekLabel:string,
  bundles: Array<bundles>
}
export interface bundles{

  caption: string,
  code: string,
  version: string,
  sessions: Array<sessions>
}
export interface sessions{
  
  screenName: string,
  screenNumber: string,
  showDate: string,
  showTime:string,


}

export interface FilmDetail {
  id: string,
  slug: string,
  name: string,
  vistaName: string,
  imagePortrait: string,
  imageUrls: string,
  imageLandscape: string,
}
export default interface allAction {
  payload: any,
  type: string,
}

export default interface Info{
  id: string,
  age: string
  name: string,
  imageLandscape: string,
  imageLandscapeMobile: string,
  imagePortrait: string,
  subName: string,
  point: number,
  totalVotes: number,
  description: any,
  duration: string,
  startdate: string,
  trailer: string,
  slug: string,
  address: string,
  code: string,
  phone: string,
  mapEmbeb: string,
  imageUrls: Array<string>,
  ticket: Array<any>
}





