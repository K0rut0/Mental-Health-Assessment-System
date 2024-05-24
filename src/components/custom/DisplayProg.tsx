import { Label } from "../ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DisplayProg({data, id}:{
    data: any,
    id: number
}){
    console.log(data)
    return(
        <div className="flex flex-col gap-2">
            {data.map((x: any) => {
            if(x.program_department == id){
                return(
                    <Card>
                        
                        <CardTitle>
                            {x.acronym}
                        </CardTitle>
                        <CardContent className="flex flex-col gap-2">
                            <Label>Program average: {x.round}</Label>
                            <Label>Program min: {x.min}</Label>
                            <Label>Program max: {x.max}</Label>
                        </CardContent>
                    </Card>
                )
            }
            })}
        </div>
    )
}