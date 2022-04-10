import React from 'react';
import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { formatDate } from '../../utils';

const ReportChart = ({ emotions }) => {
  const emotionColors = { 1: '#db1414', 2: '#e07502', 3: '#ffd500', 4: '#75db40', 5: 'green' };
  let data = [];

  emotions.forEach(emotionObj => {
    data.push({name: formatDate(emotionObj.date), uv: Number(emotionObj.emotion), fill: emotionColors[emotionObj.emotion] })
  });
  

  return (
    <>
      <ResponsiveContainer width={1200} height={550}>
        <BarChart
          width={500}
          height={300}
          data={data}
          id="report-chart"
        >
          <CartesianGrid strokeDasharray={"3 3"} />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 5]} />
          <Tooltip cursor={{fill: '#e8e4e3'}} className="opacity-20"/>
          <Legend />
          <Bar name="Emoji rate" type="monotone" dataKey="uv"  />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}

export default ReportChart;