// Interface for representing the structure of a PDF file in the system
export interface IPDF{
 fieldname: string,
 originalname: string,
  encoding:string,
  mimetype: string,
  destination: string,
  filename: string,
  path: string,
  size: number
}