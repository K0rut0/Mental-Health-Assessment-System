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
                    <Card key={x.id}>
                        
                        <CardTitle key={x.id+'title'}>
                            {x.acronym}
                        </CardTitle>
                        <CardContent className="flex flex-col gap-2" key={x.id+'cardC'}>
                            <Label key={x.id+'l1'}>Program average: {x.round}</Label>
                            <Label key={x.id+'l2'}>Program min: {x.min}</Label>
                            <Label key={x.id+'l3'}>Program max: {x.max}</Label>
                        </CardContent>
                    </Card>
                )
            }
            })}
        </div>
    )
}