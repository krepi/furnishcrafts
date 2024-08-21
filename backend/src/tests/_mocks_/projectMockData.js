export const projects = [
    {
        id: 1,
        user_id: 1,
        name: "Kitchen Renovation",
        start_date: "2024-01-01",
        status: "open",
        elements: [
            { element_id: 1, quantity: 4 },
            { element_id: 2, quantity: 2 },
            { element_id: 3, quantity: 1 }
        ],
    },
    {
        id: 2,
        user_id: 2,
        name: "Living Room Upgrade",
        start_date: "2024-02-01",
        status: "ordered",
        elements: [
            { element_id: 2, quantity: 3 },
            { element_id: 4, quantity: 2 }
        ],
    },
    {
        id: 3,
        user_id: 3,
        name: "Bedroom Setup",
        start_date: "2024-03-01",
        status: "closed",
        elements: [
            { element_id: 1, quantity: 2 },
            { element_id: 5, quantity: 4 }
        ],
    },
    {
        id: 4,
        user_id: 1,
        name: "Home Office Design",
        start_date: "2024-04-01",
        status: "open",
        elements: [
            { element_id: 3, quantity: 1 },
            { element_id: 5, quantity: 2 }
        ],
    },
    {
        id: 5,
        user_id: 2,
        name: "Garage Storage",
        start_date: "2024-05-01",
        status: "open",
        elements: [
            { element_id: 4, quantity: 3 },
            { element_id: 1, quantity: 1 }
        ],
    }
];
