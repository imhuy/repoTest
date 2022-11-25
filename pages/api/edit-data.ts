import { IData } from './../../utils/types';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import fakeData from '../../utils/fakeData';

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const fakeData = fs.readFileSync('./utils/fakeData.txt', 'utf8')
  const parseFakeData: IData[] = JSON.parse(fakeData)
  const reqData: IData = JSON.parse(req.body)
  const indexData = parseFakeData.findIndex(item => item.Code === reqData.Code)
  const editedData = [...parseFakeData.slice(0, indexData), reqData, ...parseFakeData.slice(indexData + 1)]
  fs.writeFileSync('./utils/fakeData.txt', JSON.stringify(editedData))
  // fs.writeFileSync('./utils/fakeData.txt', JSON.stringify(fakeData))
  res.status(200).json({ name: 'Saved successfully' })
}
