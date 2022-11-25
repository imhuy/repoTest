import Image from 'next/image'
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"
import EmptyTable from "../components/common/empty-table"
import Loading from '../components/common/loading'
import Pagination from "../components/common/pagination"
import SearchInput from "../components/common/search-input"
import Select from "../components/common/select"
import Table from "../components/common/table"
import EditLocationModal from "../components/home/edit-home-modal"
import { ROW_PER_PAGE } from '../utils/contants'
import fakeData from '../utils/fakeData'
import { IData, IPlatform } from "../utils/types"

export default function Home() {
  const [apiData, setApiData] = useState<IData[]>([])
  const [data, setData] = useState<IData[]>([])
  const [totalData, setTotalData] = useState<number>(0)
  const [dataEdit, setDataEdit] = useState<IData>()
  const [isLoading, setIsLoading] = useState<boolean>(false)
//   fetch('/api/edit-data', {
//     method: 'POST',
//     body: JSON.stringify(fakeData)
// })
  const router = useRouter()
  const { genre, blockchain, platform, search, page, price } = router.query

  const getData = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/get-data', {
        method: 'GET'
      })
      const parseData = await res.json()
      setApiData(parseData.name)
      setIsLoading(false)
    } catch (error: any) {
      setIsLoading(false)
    }
  }

  const genreList = apiData.map(data => data.Genres)
  const blockChainList = apiData.map(data => data.BlockChains)
  const platformList = apiData.map(data => data.Platforms)

  const genreItems = useMemo(() => {
    const items = genreList.map(genres => genres.map(genre => genre.Name))
    return [...new Set(['All Genre', ...items.flat()])]
  }
    , [genreList]
  )

  const blockChainItems = useMemo(() => {
    const items = blockChainList.map(blockchains => blockchains.map(blockchain => blockchain.Name))
    return [...new Set(['All Blockchain', ...items.flat()])]
  }
    , [blockChainList]
  )

  const platformItems = useMemo(() => {
    const items = platformList.map(platforms => platforms.map(platform => platform.Name))
    return [...new Set(['All Platform', ...items.flat()])]
  }
    , [platformList]
  )

  const onChangeParam = (key: string, value: string | number) => {
    key !== 'page' && router.push({ query: { ...router.query, [key]: value, page: 1 } })
    key === 'page' && router.push({ query: { ...router.query, [key]: value } })
  }

  const renderIcon = (icon: string) => (
    <Image
      src={`/assets/images/${icon}.svg`}
      alt='platform icon'
      className="mr-3 mb-3"
      width={24}
      height={24}
    />
  )

  const renderImage = (image?: string | null, width = 24, height = 24, margin = 'mr-3') => (
    <Image
      src={image || 'https://tk-storage.s3.ap-southeast-1.amazonaws.com/host/game/TheSandbox_thumb_64x64_20220629112358.png'}
      alt='image'
      className={margin}
      width={width}
      height={height}
    />
  )

  const onEdit = (data: IData) => {
    setDataEdit(data)
  }

  const onCloseEditModal = (isSaved: boolean) => {
    isSaved && getData()
    setDataEdit(undefined)
  }

  const onSort = () => {
    onChangeParam('price', !price || price === 'des' ? 'asc' : 'des')
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    setData(apiData)
    setTotalData(apiData.length)
    if (!page) {
      onChangeParam('page', 1)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query, apiData])

  useEffect(() => {
    if (genre && genre !== 'All Genre') {
      setData((prev) => {
        const result = prev.filter(data =>
          data.Genres.filter(item =>
            item.Name.includes(genre as string)
          ).length)
        setTotalData(result.length)
        return result
      })
    }
    if (blockchain && blockchain !== 'All Blockchain') {
      setData((prev) => {
        const result = prev.filter(data =>
          data.BlockChains.filter(item =>
            item.Name.includes(blockchain as string)
          ).length)
        setTotalData(result.length)
        return result
      })
    }
    if (platform && platform !== 'All Platform') {
      setData((prev) => {
        const result = prev.filter(data =>
          data.Platforms.filter(item =>
            item.Name.includes(platform as string)
          ).length)
        setTotalData(result.length)
        return result
      })
    }

    if (page) {
      const currentItem = (+page - 1) * ROW_PER_PAGE
      setData((prev) => prev.slice(currentItem, +page * ROW_PER_PAGE))
    }

    if (price) {
      setData((prev) => prev.sort((a, b) => price === 'asc' ? (a.Price - b.Price) : (b.Price - a.Price)))
    }

    if (search) {
      setData((prev) => {
        const result = prev.filter(data => data.Name.toLowerCase().includes((search as string).toLowerCase())
          || data.Symbol.toLowerCase().includes((search as string).toLowerCase()))
        setTotalData(result.length)
        return result
      })
    }
  }, [blockchain, genre, platform, search, page, price, apiData])

  return (
    <div className="container">
      <h1 className="mt-20">Best Free P2E NFT Games in 2022</h1>
      <p className="typo-normal title">Are you looking for Games that Free-to-play? Here are the best F2P NFT games available.</p>
      <div className="flex">
        <Select
          items={genreItems}
          onChangeValue={(value) => onChangeParam('genre', value)}
          selected={genre}
          icon='/assets/images/game.svg'
        />
        <Select
          items={blockChainItems}
          onChangeValue={(value) => onChangeParam('blockchain', value)}
          selected={blockchain}
          icon='/assets/images/block.svg'
        />
        <Select
          items={platformItems}
          onChangeValue={(value) => onChangeParam('platform', value)}
          selected={platform}
          icon='/assets/images/mobile.svg'
        />
        <SearchInput
          onChangeValue={(value) => onChangeParam('search', value)}
          placeholder='Search Name / Symbol'
          defaultValue={search}
        />
        {search && <span className='search-founded typo-small mt-4 ml-4 text-grey'>Founded <span className='underline typo-small font-medium'>{totalData}</span> items</span>}
      </div>

      {(isLoading && <Loading />) || (data.length
        ?
        <>
          <div className='location__table overflow-scroll'>
            <Table className="relative mt-4">
              <thead className="sticky">
                <tr>
                  <th style={{ width: '1%' }} className="text-start">#</th>
                  <th style={{ width: '30%' }} className="text-start">Name</th>
                  <th style={{ width: '20%' }} className="text-start cursor-pointer" onClick={onSort}>Price {price ? (price === 'asc' ? '↑' : '↓') : '⇵'}</th>
                  <th style={{ width: '20%' }} className="text-start">Genre</th>
                  <th style={{ width: '10%' }} className="text-end">Platform</th>
                  <th style={{ width: '5%' }} />
                </tr>
              </thead>
              <tbody>
                {data.map(((item, index) => <tr key={index}>
                  <td className="typo-normal">{index + 1 + (ROW_PER_PAGE * ((page ? +page : 1) - 1))}</td>
                  <td>
                    <div className="flex items-start">
                      {renderImage(item.ImageUrl, 40, 40, 'mt-2')}
                      <div className="ml-5">
                        <span className="mr-1 typo-normal">{item.Name}</span><span className="uppercase text-grey typo-normal font-medium">{item.Symbol}</span>
                        <div className="flex flex-wrap items-center mt-2">
                          {item.BlockChains.map((blockchain, index) => (
                            <div key={index} className='flex items-center mb-1'>
                              <span>{renderImage(blockchain.ExtendValue, 20, 20, 'mr-2')}</span>
                              <span className="mr-5 typo-small font-normal text-grey">{blockchain.Name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="typo-medium-bold">$ {item.Price}</td>
                  <td className="typo-normal">{item.Genres.map(genre => genre.Name).join(' | ')}</td>
                  <td>
                    <div className="flex flex-wrap justify-end">
                      {item.Platforms.map(platform => {
                        if (platform.Name.toLowerCase() === IPlatform.IOS.toLowerCase() || platform.Name.toLowerCase() === IPlatform.MAC.toLowerCase()) {
                          return renderIcon('apple')
                        }
                        if (platform.Name.toLowerCase() === IPlatform.ANDROID.toLowerCase()) {
                          return renderIcon('android')
                        }
                        return renderIcon('code')
                      })}
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-end cursor-pointer" onClick={() => onEdit(item)}>
                      {renderImage('/assets/images/pencil.svg')}
                    </div>
                  </td>
                </tr>))}
              </tbody>
            </Table>
          </div>
          <Pagination
            total={page ? totalData : data.length}
            totalCurrentPage={data.length}
            onCurrentPage={(value) => onChangeParam('page', value)}
          />
        </>
        :
        <EmptyTable />)
      }
      {dataEdit && <EditLocationModal data={dataEdit} onClose={isSaved => onCloseEditModal(isSaved)} />}
    </div>
  )
}

export async function getServerSideProps() {
  return {
    props: {},
  }
}