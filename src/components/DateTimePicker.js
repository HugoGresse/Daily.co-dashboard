import React, { useEffect, useState } from 'react'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'
import * as moment from 'moment'

const isOutsideRange = (day) => {
    return day.valueOf() > moment().add(1, 'd').valueOf()
}

const DateTimePicker = ({
    onDateChange,
    onClose,
    defaultStartDate = moment().subtract(7, 'd'),
    defaultEndDate = moment(),
}) => {
    const [startDate, setStartDate] = useState(defaultStartDate)
    const [endDate, setEndDate] = useState(defaultEndDate)
    const [focusedInput, setFocusInput] = useState(null)
    const [close, setClose] = useState(false)

    const onDatesChange = ({ startDate, endDate }) => {
        startDate && setStartDate(startDate)
        endDate && setEndDate(endDate)
        onDateChange && onDateChange({ startDate, endDate })
    }
    const onFocusChange = (input) => {
        setFocusInput(input)
    }

    useEffect(() => {
        if (close) {
            onClose(startDate, endDate)
            setClose(false)
        }
    }, [close, onClose, startDate, endDate])

    return (
        <DateRangePicker
            startDateId="startDate"
            endDateId="endDate"
            onDatesChange={onDatesChange}
            onFocusChange={onFocusChange}
            focusedInput={focusedInput}
            startDate={startDate}
            endDate={endDate}
            isOutsideRange={isOutsideRange}
            onClose={() => setClose(true)}
        />
    )
}

export default DateTimePicker
