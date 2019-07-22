export interface Project {  
    id: string,  
    displayName: string,
    alternateId: [{key:string,value:string}],
    sponsor: string,
    sponsorStudyName: string,
    status: string 
}