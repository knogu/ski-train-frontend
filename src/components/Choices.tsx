import React, { useEffect, useState } from 'react';
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
    <div className='totalChoices accordion' id={'totalAccordion-' + props.wayName}>
      {choiceItems}
    </div>
  )
}

interface ChoiceProps {
  choice: Service[];
  wayName: string;
  index: string;
}

const Choice = (props: ChoiceProps) => {
  const { choice, wayName, index } = props;

  const choiceItem = choice.map((service) => {
    return (
      <>
        <p>{service.startTime.hhmm()}{service.startStation}出発</p>
        <p>{service.reachTime.hhmm()}{service.reachStation}到着</p>
      </>
    )
  })

  const idForAccordion = wayName + index;
  
  return (
    <div className='choice accordion-item'>
      <h2 className='accordion-header' id={"heading" + idForAccordion}>
        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + idForAccordion} aria-expanded="false" aria-controls={"collapse" + idForAccordion}>
          <span>
            {choice[0].startTime.hhmm() + '-' + choice.slice(-1)[0].reachTime.hhmm()}
          </span>
          <span>
            ({choice.slice(-1)[0].reachTime.subtract(choice[0].startTime).hhmm()})
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
