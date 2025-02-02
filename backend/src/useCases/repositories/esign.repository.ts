export interface IESignConfig
{
    getTemplateCreationUrl(base64File: string)
    getTemplateByIdConfig(templateId : string)
    createDocumentFromTemplateConfig(templateId:string )
    createDocumentConfig( file , body)
}