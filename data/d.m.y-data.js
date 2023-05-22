export const dayList = Array.from(
    new Array(31), (val, i) => 1 + i
)

export const monthList = [
    {
        name: 'Jan',
        no: 1
    },
    {
        name: 'Feb',
        no: 2
    },
    {
        name: 'Mar',
        no: 3
    },
    {
        name: 'Apr',
        no: 4
    },
    {
        name: 'May',
        no: 5
    },
    {
        name: 'Jun',
        no: 6
    },
    {
        name: 'Jul',
        no: 7
    },
    {
        name: 'Aug',
        no: 8
    },
    {
        name: 'Sep',
        no: 9
    },
    {
        name: 'Oct',
        no: 10
    },
    {
        name: 'Nov',
        no: 11
    },
    {
        name: 'Dec',
        no: 12
    }
]

export const yearList = Array.from(
    new Array(20), (val, i) => ((new Date()).getFullYear() - 5) + i
)