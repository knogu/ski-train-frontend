import React, { useEffect, useState } from 'react';
import { Service } from '../objects/service';

interface Props {
  choices: Service[][];
  wayKey: string;
}

export const TotalChoices = (props: Props) => {
  const choiceItems = props.choices.map((choice, i) => {
    return (
      <Choice
        choice={ choice }
        wayKey={ props.wayKey }
        key={ i.toString() }
      />
    )
  })

  return (
    <div className='totalChoices accordion' id={'totalAccordion-' + props.wayKey}>
      {choiceItems}
    </div>
  )
}

interface ChoiceProps {
  choice: Service[];
  wayKey: string;
  key: string;
}

const Choice = (props: ChoiceProps) => {
  const { choice, wayKey, key } = props

  const choiceItem = choice.map((service) => {
    return (
      <>
        <p>{service.startTime.paddedHour()}時{service.startStation}出発</p>
        <p>{service.reachTime.paddedHour()}時{service.reachStation}到着</p>
      </>
    )
  })
  
  return (
    <div className='choice accordion-item'>
      <h2 className='accordion-header' id={"heading" + key}>
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + key} aria-expanded="false" aria-controls={"collapse" + key}>
          <span>
            {choice[0].startTime.hhmm() + '-' + choice.slice(-1)[0].reachTime.hhmm()}
          </span>
          <span>
            ({choice.slice(-1)[0].reachTime.subtract(choice[0].startTime).hhmm()})
          </span>
        </button>
      </h2>
      <div id={"collapse" + key} className="accordion-collapse collapse" aria-labelledby={"heading" + key} data-bs-parent={'totalAccordion-' + wayKey}>
        <div className="accordion-body">
          {choiceItem}
        </div>
      </div>
    </div>
  )
}
