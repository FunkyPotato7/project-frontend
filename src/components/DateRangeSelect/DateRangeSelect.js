import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import format from 'date-fns/format';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import css from './DateRangeSelect.module.css';

const DateRangeSelect = ({dateValue, setDateValue}) => {
    const [query, setQuery] = useSearchParams();
    const [open, setOpen] = useState(false);
    const [range, setRange] = useState([
        {
            startDate: query.get('start_date') ? new Date(query.get('start_date')) : new Date(),
            endDate: query.get('end_date') ? new Date(query.get('end_date')) : addDays(new Date(), 6),
            key: 'selection'
        }
    ]);

    const refOne = useRef(null);

    useEffect(() => {
        document.addEventListener("keydown", hideOnEscape, true);
        document.addEventListener("click", hideOnClickOutside, true);
    });

    const hideOnEscape = (e) => {
        if (e.key === "Escape") {
            setOpen(false);
        }
    };

    const hideOnClickOutside = (e) => {
        if (refOne.current && !refOne.current.contains(e.target)) {
            setOpen(false);
        }

    };

    const handleInputClick = () => setOpen(!open);

    const handleInputChange = (event) => {
        let value = event.target.value;

        if (event.nativeEvent.inputType !== 'deleteContentBackward') {
            if (value?.length === 2 && value.slice(0, 2) > '12') {
                value = value.replace(value.slice(0, 2), '12');
            } else if (value?.length === 2 && value.slice(0, 2) < '01' ) {
                value = value.replace(value.slice(0, 2), '01');
            } else if (value?.length > 2 && value.charAt(2) !== '/') {
                value = value.replace(value.slice(0, 2), '01');
            }

            if (value?.length === 5 && value.slice(3, 5) > '31') {
                value = value.replace(value.slice(3, 5), '31');
            } else if (value?.length === 5 && value.slice(3, 5) < '01') {
                value = value.replace(value.slice(3, 5), '01');
            } else if (value?.length > 5 && value.charAt(5) !== '/') {
                value = value.replace(value.slice(3, 5), '01');
            }

            if (value?.length === 10 && value.slice(6, 10) > '2042') {
                value = value.replace(value.slice(6, 10), '2042');
            } else if (value?.length === 10 && value.slice(6, 10) < '1922') {
                value = value.replace(value.slice(6, 10), '1922');
            }  else if (value?.length > 10 && value.charAt(11) !== '-') {
                value = value.replace(value.slice(6, 10), '1922');
            }

            if (value?.length === 15 && value.slice(13, 15) > '12') {
                value = value.replace(value.slice(13, 15), '01');
            } else if (value?.length === 15 && value.slice(13, 15) < '01') {
                value = value.replace(value.slice(13, 15), '01');
            } else if (value?.length > 15 && value.charAt(15) !== '/') {
                value = value.replace(value.slice(13, 15), '01');
            }

            if (value?.length === 18 && value.slice(16, 18) > '31') {
                value = value.replace(value.slice(16, 18), '31');
            } else if (value?.length === 18 && value.slice(16, 18) < '01' ) {
                value = value.replace(value.slice(16, 18), '01');
            } else if (value?.length > 18 && value.charAt(18) !== '/') {
                value = value.replace(value.slice(16, 18), '01');
            }

            if (value?.length === 23 && value.slice(19, 30) > '2042') {
                value = value.replace(value.slice(19), '2042');
            } else if (value?.length === 23 && value.slice(19, 30) < '1922') {
                value = value.replace(value.slice(19), '1922');
            } else if (value?.length > 23) {
                value = value.replace(value.slice(19, 30), '1922');
            }

            switch(value?.length) {
                case 2:
                    value += '/';
                    break;
                case 5:
                    value += '/';
                    break;
                case 10:
                    value += ' - ';
                    break;
                case 15:
                    value += '/';
                    break;
                case 18:
                    value += '/';
                    break;
                default:
                    break;
            }
        }

        if (event.target.name === 'Created_At') {
            setDateValue(value);
        }

        if (value?.length === 23 && event.target.name === 'Created_At' && event.keyCode !== 8) {
            const [startDate, endDate] = value.split(' - ');
            const newRange = [
                {
                    startDate: startDate ? new Date(startDate) : range[0].startDate,
                    endDate: endDate ? new Date(endDate) : range[0].endDate,
                    key: 'selection',
                },
            ];

            if (newRange[0].startDate.toString() === 'Invalid Date' || newRange[0].endDate.toString() === 'Invalid Date') {
                setDateValue('01/01/1922 - 01/01/1922');
            } else {
                handleDateChange(newRange);
            }

        }

    }

    const handleDateChange = (item) => {
        query.set('start_date', item[0].startDate);
        query.set('end_date', item[0].endDate);

        setRange(item);
        setQuery(query);
        setDateValue(`${format(new Date(query.get('start_date')), 'MM/dd/yyyy')} - ${format(new Date(query.get('end_date')), 'MM/dd/yyyy')}`);
    };


    return(
        <div className={css.CalendarWrap}>
            <div className={css.InputBox} onClick={handleInputClick}>
                <input
                    className={css.Input}
                    name="Created_At"
                    type="text"
                    placeholder={open ? "MM/DD/YY - MM/DD/YY" : ''}
                    value={dateValue}
                    onChange={handleInputChange}
                />
                <span className={open || dateValue ? css.Label && css.ShrinkLabel : css.Label}>Created at</span>
                <span className={css.BorderBottom}></span>
            </div>
            <div ref={refOne}>
                {open &&
                    <DateRange
                        className={css.CalendarElement}
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        ranges={range}
                        months={1}
                        direction="horizontal"
                        onChange={item => handleDateChange([item.selection])}
                    />
                }
            </div>
        </div>
    );
};


export {
    DateRangeSelect
};