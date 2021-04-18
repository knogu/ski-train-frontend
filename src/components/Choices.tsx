import React from 'react';
import { Service } from '../objects/service';

interface Props {
  choices: Service[][];
  wayName: string;
}

export const TotalChoices = (props: Props) => {
  const choiceItems = props.choices.map((choice, i) => {
    return (
      <Choice
        choice={ choice }
        wayName={ props.wayName }
        index={ i.toString() }
        key={ i.toString() }
      />
    )
  })

  return (
    <>
      <h4 className='choices-header'>検索結果</h4>
      <div className='totalChoices accordion' id={'totalAccordion-' + props.wayName}>
        {choiceItems}
      </div>
    </>
  )
}

interface ChoiceProps {
  choice: Service[];
  wayName: string;
  index: string;
}

const Choice = (props: ChoiceProps) => {
  const { choice, wayName, index } = props;

  const choiceItem = choice.map((service, i) => {
    return (
      <div key={ i.toString() }>
        <p className='leave'>{service.startTime.hhmm()}<span className='ms-2'>{service.startStation}</span></p>
        <div className='v-line'></div>
        <p className='reach'>{service.reachTime.hhmm()}<span className='ms-2'>{service.reachStation}</span></p>
      </div>
    )
  })

  const idForAccordion = wayName + index;

  const timeRequired = choice.slice(-1)[0].reachTime.subtract(choice[0].startTime);
  const timeRequiredFmt = String(timeRequired.hour) + '時間' + String(timeRequired.minute) + '分';
  
  return (
    <div className='choice accordion-item'>
      <h2 className='accordion-header' id={"heading" + idForAccordion}>
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + idForAccordion} aria-expanded="false" aria-controls={"collapse" + idForAccordion}>
          <span>
            {choice[0].startTime.hhmm() + '-' + choice.slice(-1)[0].reachTime.hhmm()}
          </span>
          <span className='time-required'>
            ({timeRequiredFmt})
          </span>
        </button>
      </h2>
      <div id={"collapse" + idForAccordion} className="accordion-collapse collapse" aria-labelledby={"heading" + idForAccordion} data-bs-parent={'totalAccordion-' + wayName}>
        <div className="accordion-body">
          {choiceItem}
        </div>
      </div>
    </div>
  )
}
