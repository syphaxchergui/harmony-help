import React, { useState } from "react";
import { rewardsService } from "../services/reward.service";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";

const initialData = {
  title: "",
  description: "",
  competency: null,
  difficulty: null,
  duration: null,
  startDate: new Date(),
  reward: null,
};

const competencies = [
  {
    value: 10,
    name: "Competency 01",
  },
  {
    value: 15,
    name: "Competency 02",
  },
  {
    value: 23,
    name: "Competency 03",
  },
  {
    value: 29,
    name: "Competency 04",
  },
];

const difficulies = [
  {
    value: "easy",
    name: "Easy",
  },
  {
    value: "medium",
    name: "Medium",
  },
  {
    value: "hard",
    name: "Hard",
  },
];

const NewMission = () => {
  const [data, setData] = useState(initialData);
  const [showModal, setShowModal] = useState(false);
  const [rewardPoints, setRewardPoints] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(data);

    const rewardPoints = rewardsService.calculateRewardPoints(
      data.difficulty,
      data.duration * 1,
      data.competency * 1
    );
    setRewardPoints(rewardPoints);
    setShowModal(true);
  };

  return (
    <>
      <div className='container mx-auto p-4'>
        <h1 className='text-xl font-bold mb-2 '>Create a mission</h1>
        <div className='max-w-3xl'>
          <p className='mt-2'>Mission Title</p>
          <input
            placeholder='Mission Title'
            className='w-full px-3 py-2 border border-gray-300 rounded'
            onChange={(e) => setData({ ...data, title: e.target.value })}
            type='text'
            value={data.title}
            autoComplete='false'
          />

          <p className='mt-2'>Mission Description</p>
          <textarea
            placeholder='Mission Description'
            className='w-full px-3 py-2 border border-gray-300 rounded'
            onChange={(e) => setData({ ...data, description: e.target.value })}
            value={data.description}
            autoComplete='false'
          />

          <p className='mt-2'>Mission Duration (hours)</p>
          <input
            placeholder='Mission Duration'
            className='w-full px-3 py-2 border border-gray-300 rounded'
            onChange={(e) => setData({ ...data, duration: e.target.value })}
            type='number'
            value={data.duration}
            autoComplete='false'
          />

          <p className='mt-2'>Required Competency</p>
          <select
            className='w-full px-3 py-2 border border-gray-300 rounded'
            onChange={(e) => setData({ ...data, competency: e.target.value })}
            value={data.competency}>
            <option value='' disabled>
              Select a competency
            </option>
            {competencies.map((comp) => (
              <option value={comp.value}>{comp.name}</option>
            ))}
          </select>

          <p className='mt-2'>Difficulty</p>
          <select
            className='w-full px-3 py-2 border border-gray-300 rounded'
            onChange={(e) => setData({ ...data, difficulty: e.target.value })}
            value={data.difficulty}>
            <option value='' disabled>
              Select a difficulty
            </option>
            {difficulies.map((diff) => (
              <option value={diff.value}>{diff.name}</option>
            ))}
          </select>

          <p className='mt-2'>Start Date</p>
          <input
            type='date'
            className='w-full px-3 py-2 border border-gray-300 rounded'
            onChange={(e) => setData({ ...data, startDate: e.target.value })}
            value={data.startDate}
          />

          <button
            onClick={handleSubmit}
            className='mt-6 font-medium hover:bg-blue-400 px-6 py-2 rounded mr-2 bg-blue-300'>
            Create Mission
          </button>
        </div>
      </div>

      {showModal && (
        <div className="max-w-lg p-4 rounded bg-white">
          <h5 className='text-xl font-medium leading-normal text-neutral-80'>
            You mission's reward points
          </h5>
         
          <h3 className={"text-xl font-bold"}>🏆 {rewardPoints}</h3>
          <p className='mt-2'>Add a reward (a chair, a service...)</p>
          <input
            placeholder='Reward'
            className='w-full px-3 py-2 border border-gray-300 rounded'
            onChange={(e) => setData({ ...data, reward: e.target.value })}
            type='text'
            value={data.reward}
            autoComplete='false'
          />
          <button
            type='button'
            className='inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200'
            onClick={() => setShowModal(false)}>
            Close
          </button>
          <button
            type='button'
            className='ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase mx-4'>
            Publish Mission
          </button>
        </div>
      )}
    </>
  );
};

export default NewMission;
