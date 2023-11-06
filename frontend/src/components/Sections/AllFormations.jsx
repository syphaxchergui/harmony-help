import React from "react";
import Formation from "../Cards/Formation";

const AllCourses = () => {
    const courses = [
        {
            id: 1,
            title: "Introduction to Painting",
            createdAt: "2022-01-01T12:00:00Z",
            author: "John Doe",
            description:
                "Learn the basics of painting and create your first masterpiece.",
        },
        {
            id: 2,
            title: "Plumbing 101",
            createdAt: "2022-02-14T09:00:00Z",
            author: "Jane Smith",
            description:
                "Get started with plumbing and learn how to fix common household issues.",
        },
        {
            id: 3,
            title: "Advanced Carpentry",
            createdAt: "2022-03-20T10:00:00Z",
            author: "Bob Johnson",
            description:
                "Take your carpentry skills to the next level with advanced techniques.",
        },
        {
            id: 4,
            title: "Introduction to Photography",
            createdAt: "2022-04-15T14:00:00Z",
            author: "Sarah Lee",
            description:
                "Learn the basics of photography and capture stunning images.",
        },
        {
            id: 5,
            title: "Web Development Bootcamp",
            createdAt: "2022-05-10T08:00:00Z",
            author: "Mike Johnson",
            description:
                "Become a full-stack web developer with this comprehensive bootcamp.",
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
                <Formation
                    key={course.id}
                    id={course.id}
                    title={course.title}
                    createdAt={course.createdAt}
                    author={course.author}
                    description={course.description}
                    image={course.image}
                />
            ))}
        </div>
    );
};

export default AllCourses;
