import React from 'react'
import Event from '../Cards/Event';

const AllEvents = () => {
    const events = [
        {
            id: 1,
            title: "Charity Concert",
            createdAt: "2022-01-01T12:00:00Z",
            author: "John Doe",
            address: "123 Main St, Anytown USA"
        },
        {
            id: 2,
            title: "Food Drive",
            createdAt: "2022-02-14T09:00:00Z",
            author: "Jane Smith",
            address: "456 Elm St, Anytown USA"
        },
        {
            id: 3,
            title: "Volunteer Cleanup",
            createdAt: "2022-03-20T10:00:00Z",
            author: "Bob Johnson",
            address: "789 Oak St, Anytown USA"
        }
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {events.map(event => (
                <Event key={event.id} id={event.id} title={event.title} createdAt={event.createdAt} author={event.author} address={event.address} />
            ))}
        </div>
    );
}

export default AllEvents