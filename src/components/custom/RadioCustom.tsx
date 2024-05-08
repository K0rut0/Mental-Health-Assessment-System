import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useEffect, useState } from "react"
interface Question {
    question: string;
    id: number;
    scale: number;
    survey_id: number;
    is_reversed: boolean;
}

function RadioCustom({question, onChange}: {question: Question, onChange: Function}){
    const SetRadioValue = (val: number) => {
        onChange(val)
    }
    let labelsFour = ["Strongly Agree", "Agree", "Disagree", "Strongly Disagree"]
    let labelsFive = ["Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree"]
    if(question.is_reversed){
        labelsFour = labelsFour.reverse()
    }
    let label: string[] = []
    switch(question.scale){
        case 4:
            label = labelsFour;
            break;
        case 5:
            label = labelsFive;
            break;
    }
    return(
        <div>
            <RadioGroup defaultValue={"0"} id="QuestionRadios">
                {Array.from({ length: question.scale }).map((_, i) => 
                <div key={i+`d`}>
                <Label className="text-black" key={`label` + i}>{label[i]}</Label>
                <RadioGroupItem  className="text-black accent-black" value={i.toString()} id={( i+1)+`n`} onClick={() => SetRadioValue(i)} key={`key-`+i}>  </RadioGroupItem>
                </div>)}
            </RadioGroup>
        </div>
    )
}

export default RadioCustom