import { useState, useEffect, useRef } from 'react'
import styles from './CalendarGrid.module.css'

export interface CalendarGridProps {
    onDateRangeChange: (startDate: string, endDate: string) => void
    label?: string
    clearTrigger?: number // Increment this to trigger a clear
}

interface CalendarDay {
    date: Date
    dayOfMonth: number
    isCurrentMonth: boolean
    isToday: boolean
    isSelected: boolean
    isInRange: boolean
    isStartDate: boolean
    isEndDate: boolean
}

const formatDate = (date: Date) => date.toISOString().split('T')[0]

function CalendarGrid(props: CalendarGridProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date())
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [showMonthDropdown, setShowMonthDropdown] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    
    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowMonthDropdown(false)
            }
        }
        
        if (showMonthDropdown) {
            document.addEventListener('mousedown', handleClickOutside)
            return () => document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showMonthDropdown])
    
    // Clear calendar when clearTrigger changes
    useEffect(() => {
        if (props.clearTrigger !== undefined && props.clearTrigger > 0) {
            setStartDate(null)
            setEndDate(null)
        }
    }, [props.clearTrigger])
    
    // Call the callback directly when dates change, not in useEffect
    const updateDateRange = (start: Date | null, end: Date | null) => {
        if (start && end) {
            props.onDateRangeChange(formatDate(start), formatDate(end))
        }
    }
    
    const generateCalendarDays = (month: Date): CalendarDay[] => {
        const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1)
        const lastDayOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0)
        const firstDayOfWeek = firstDayOfMonth.getDay()
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        const days: CalendarDay[] = []
        
        // Add previous month's trailing days
        for (let i = firstDayOfWeek - 1; i >= 0; i--) {
            const date = new Date(firstDayOfMonth)
            date.setDate(date.getDate() - i - 1)
            days.push({
                date: new Date(date),
                dayOfMonth: date.getDate(),
                isCurrentMonth: false,
                isToday: false,
                isSelected: false,
                isInRange: false,
                isStartDate: false,
                isEndDate: false
            })
        }
        
        // Add current month's days
        for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
            const date = new Date(month.getFullYear(), month.getMonth(), day)
            const isToday = date.getTime() === today.getTime()
            const isSelected = (startDate && date.getTime() === startDate.getTime()) || 
                             (endDate && date.getTime() === endDate.getTime()) || false
            const isInRange = (startDate && endDate && 
                            date.getTime() > startDate.getTime() && 
                            date.getTime() < endDate.getTime()) || false
            const isStartDate = (startDate && date.getTime() === startDate.getTime()) || false
            const isEndDate = (endDate && date.getTime() === endDate.getTime()) || false
            
            days.push({
                date: new Date(date),
                dayOfMonth: day,
                isCurrentMonth: true,
                isToday,
                isSelected,
                isInRange,
                isStartDate,
                isEndDate
            })
        }
        
        // Add next month's leading days to fill the grid
        const remainingDays = 42 - days.length // 6 weeks * 7 days
        for (let day = 1; day <= remainingDays; day++) {
            const date = new Date(month.getFullYear(), month.getMonth() + 1, day)
            days.push({
                date: new Date(date),
                dayOfMonth: day,
                isCurrentMonth: false,
                isToday: false,
                isSelected: false,
                isInRange: false,
                isStartDate: false,
                isEndDate: false
            })
        }
        
        return days
    }
    
    const handleDateClick = (day: CalendarDay) => {
        // Prevent selecting past dates
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        if (day.date < today) return
        
        if (!startDate || (startDate && endDate)) {
            // Start new selection
            setStartDate(day.date)
            setEndDate(null)
        } else if (startDate && !endDate) {
            // Complete the range
            let newStart = startDate
            let newEnd = day.date
            
            if (day.date < startDate) {
                // If clicked date is before start, make it the new start
                newStart = day.date
                newEnd = startDate
            }
            
            setStartDate(newStart)
            setEndDate(newEnd)
            updateDateRange(newStart, newEnd)
        }
    }
    
    const goToPreviousMonth = () => {
        const today = new Date()
        const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
        
        // Don't go before current month
        if (newMonth.getFullYear() > today.getFullYear() || 
            (newMonth.getFullYear() === today.getFullYear() && newMonth.getMonth() >= today.getMonth())) {
            setCurrentMonth(newMonth)
        }
    }
    
    const goToNextMonth = () => {
        const today = new Date()
        const maxMonth = new Date(today.getFullYear(), today.getMonth() + 12)
        const newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
        
        // Don't go beyond 12 months from now
        if (newMonth <= maxMonth) {
            setCurrentMonth(newMonth)
        }
    }
    
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    
    const calendarDays = generateCalendarDays(currentMonth)
    
    // Determine if navigation buttons should be disabled
    const today = new Date()
    const isAtMinMonth = currentMonth.getFullYear() === today.getFullYear() && 
                        currentMonth.getMonth() === today.getMonth()
    const maxMonth = new Date(today.getFullYear(), today.getMonth() + 12)
    const isAtMaxMonth = currentMonth.getFullYear() >= maxMonth.getFullYear() && 
                        currentMonth.getMonth() >= maxMonth.getMonth()
    
    return (
        <div className={styles.container}>
            {props.label && (
                <h2 className={styles.label}>{props.label}</h2>
            )}
            
            <div className={styles.calendar}>
                <div className={styles.header}>
                    <button 
                        type="button"
                        className={`${styles.navButton} ${isAtMinMonth ? styles.disabled : ''}`}
                        onClick={goToPreviousMonth}
                        disabled={isAtMinMonth}
                    >
                        ‹
                    </button>
                    <div className={styles.monthTitleContainer} ref={dropdownRef}>
                        <button
                            type="button"
                            className={styles.monthTitle}
                            onClick={() => setShowMonthDropdown(!showMonthDropdown)}
                        >
                            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                            <span className={styles.dropdownArrow}>▼</span>
                        </button>
                        
                        {showMonthDropdown && (
                            <div className={styles.monthDropdown}>
                                {/* Generate months from current month for next 13 months (current + 12 future) */}
                                {Array.from({ length: 13 }, (_, i) => {
                                    const today = new Date()
                                    const monthDate = new Date(today.getFullYear(), today.getMonth() + i, 1)
                                    const monthIndex = monthDate.getMonth()
                                    const year = monthDate.getFullYear()
                                    const isCurrentMonth = i === 0
                                    const needsYearSeparator = i > 0 && monthIndex === 0
                                    
                                    return (
                                        <div key={`month-${year}-${monthIndex}`}>
                                            {needsYearSeparator && (
                                                <div className={styles.yearSeparator}>
                                                    {year}
                                                </div>
                                            )}
                                            <button
                                                type="button"
                                                className={`${styles.monthOption} ${
                                                    isCurrentMonth ? styles.currentMonthOption : ''
                                                }`}
                                                onClick={() => {
                                                    setCurrentMonth(new Date(year, monthIndex, 1))
                                                    setShowMonthDropdown(false)
                                                }}
                                            >
                                                {monthNames[monthIndex]} {year}
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                    <button 
                        type="button"
                        className={`${styles.navButton} ${isAtMaxMonth ? styles.disabled : ''}`}
                        onClick={goToNextMonth}
                        disabled={isAtMaxMonth}
                    >
                        ›
                    </button>
                </div>
                
                <div className={styles.dayNames}>
                    {dayNames.map(dayName => (
                        <div key={dayName} className={styles.dayName}>
                            {dayName}
                        </div>
                    ))}
                </div>
                
                <div className={styles.daysGrid}>
                    {calendarDays.map((day, index) => {
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        const isPast = day.date < today
                        
                        return (
                            <button
                                key={index}
                                type="button"
                                className={`
                                    ${styles.dayButton}
                                    ${!day.isCurrentMonth ? styles.otherMonth : ''}
                                    ${day.isToday ? styles.today : ''}
                                    ${day.isStartDate ? styles.startDate : ''}
                                    ${day.isEndDate ? styles.endDate : ''}
                                    ${day.isInRange ? styles.inRange : ''}
                                    ${isPast ? styles.past : ''}
                                `}
                                onClick={() => handleDateClick(day)}
                                disabled={isPast}
                            >
                                {day.dayOfMonth}
                            </button>
                        )
                    })}
                </div>
            </div>
            
            {startDate && endDate && (
                <div className={styles.selectedRange}>
                    <strong>Selected:</strong> {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                </div>
            )}
            
            <div className={styles.quickButtons}>
                <button 
                    type="button"
                    className={styles.quickButton}
                    onClick={() => {
                        // Set range to entire current month being viewed
                        const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
                        const lastDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)
                        
                        // If we're viewing current month, start from today instead of 1st
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        const startDate = (currentMonth.getFullYear() === today.getFullYear() && 
                                         currentMonth.getMonth() === today.getMonth()) 
                                         ? today : firstDayOfMonth
                        
                        setStartDate(startDate)
                        setEndDate(lastDayOfMonth)
                        updateDateRange(startDate, lastDayOfMonth)
                    }}
                >
                    This entire month
                </button>
                <button 
                    type="button"
                    className={styles.quickButton}
                    onClick={() => {
                        setStartDate(null)
                        setEndDate(null)
                    }}
                >
                    Clear
                </button>
            </div>
        </div>
    )
}

export default CalendarGrid
