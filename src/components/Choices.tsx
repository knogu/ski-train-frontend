import React, { useEffect, useState } from 'react';
import { Service } from '../objects/service';

interface Props {
  choices: Service[][]
}

export const TotalChoices = (props: Props) => {
  const choiceItems = props.choices.map((choice, i) => {
    return (
      <Choice
        choice={choice}
        key={i}
      />
    )
  })

  return (
    <div className='totalChoices'>
      {choiceItems}
    </div>
  )
}

interface ChoiceProps {
  choice: Service[]
}

const Choice = (props: ChoiceProps) => {
  const { choice } = props

  const choiceItem = choice.map((service) => {
    return (
      <>
        <p>{service.startTime.paddedHour()}時{service.startStation}出発</p>
        <p>{service.reachTime.paddedHour()}時{service.reachStation}到着</p>
      </>
    )
  })
  
  return (
    <div className='choice'>
      選択肢
      {choiceItem}
    </div>
  )
}
