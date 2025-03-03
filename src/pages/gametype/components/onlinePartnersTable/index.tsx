import React, { memo,  useEffect } from 'react'
import CustomCard from '../../../../components/common/card'
import CustomTable from '../../../../components/common/table'
import { onlinePartnersColumns } from '../../../../utils/tableColumns/onlinePartnersColumns'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, IRootStore } from '../../../../store'
import {
  updateOnlinePartnersOrderAction,
  updateOnlinePartnerStatusAction
} from '../../../../store/slices/onlinePartnersSlice/actions'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  clearPartners,
  setFilters,
  setMultiSelectMode,
  setOnlinePartners,
  setSelectedOnlinePartner,
  setSelectedOnlinePartners
} from '../../../../store/slices/onlinePartnersSlice'
import { IOnlinePartner } from '../../../../types/onlinePartners'
import { DndContext } from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { CSS } from '@dnd-kit/utilities'
import { AiOutlineMenu } from 'react-icons/ai'
import { toggleModal } from '../../../../store/slices/modalSlices'
import { Button, Tooltip } from 'antd'
import { FaCopy, FaTrash } from 'react-icons/fa'
import { IoCopy } from 'react-icons/io5'
import './onlinePartnersTable.sass'

const OnlinePartnersTable = () => {

  const dispatch = useDispatch<AppDispatch>()
  const {
    gameTypeId,
    onlinePartners,
    loading,
    selectedOnlinePartners,
    multiSelectMode,
    filters
  } = useSelector((state: IRootStore) => state.onlinePartners)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    return () => {
      dispatch(clearPartners())
      dispatch(setMultiSelectMode(false))
      dispatch(setFilters({}))
    }
  }, [])

  const onDragEnd = ({ active, over }: any) => {
    if (active.id !== over?.id) {
      const oldIndex = onlinePartners.findIndex(
        (i: IOnlinePartner) => i.order === active.id
      )
      const newIndex = onlinePartners.findIndex(
        (i: IOnlinePartner) => i.order === over.id
      )

      const newOrderedPartners = arrayMove(
        onlinePartners,
        oldIndex,
        newIndex
      ).map((item: IOnlinePartner, index: number) => ({
        ...item,
        order: index + 1
      }))
      dispatch(setOnlinePartners(newOrderedPartners))
      dispatch(updateOnlinePartnersOrderAction(newOrderedPartners, gameTypeId))
    }
  }

  const handleEditOnPartner = (partner: any) => {
    navigate(location.pathname + '/' + partner.id)
  }

  const handleDelOnPartner = (partner: any) => {
    dispatch(setSelectedOnlinePartner(partner))
    dispatch(toggleModal({ type: 'del' }))
  }

  const handleOnPartnerStatus = (partner: any) => {
    dispatch(updateOnlinePartnerStatusAction(partner.id, !partner.status))
  }

  const handleCopyHere = (partner: any) => {
    dispatch(setSelectedOnlinePartner(partner))
    dispatch(toggleModal({ type: 'copyhe', hint: 'single' }))
  }

  const handleCopyAnywhere = (partner: any) => {
    dispatch(setSelectedOnlinePartner(partner))
    dispatch(toggleModal({ type: 'copyan', hint: 'single' }))
  }

  const handleSelect = (selectedRowKeys: any, status: boolean) => {
    if (selectedRowKeys !== 'all') {
      if (status) {
        dispatch(
          setSelectedOnlinePartners([
            ...selectedOnlinePartners,
            selectedRowKeys
          ])
        )
      } else {
        dispatch(
          setSelectedOnlinePartners(
            selectedOnlinePartners.filter(
              (partner: any) => partner.id !== selectedRowKeys.id
            )
          )
        )
      }
    } else {
      if (status) {
        dispatch(setSelectedOnlinePartners(onlinePartners))
      } else {
        dispatch(setSelectedOnlinePartners([]))
      }
    }
  }

  const handleMultiDel = () => {
    dispatch(toggleModal({ type: 'del', hint: 'multi' }))
  }

  const handleMultiCopyHere = () => {
    dispatch(toggleModal({ type: 'copyhe', hint: 'multi' }))
  }

  const handleMultiCopyAnywhere = () => {
    dispatch(toggleModal({ type: 'copyan', hint: 'multi' }))
  }

  const handleFilter = (key: string, value: string | null) => {
    dispatch(setFilters({ ...filters, [key]: value }))
  }

  return (
    <CustomCard>
      <div className='btnsContainer'>
        <Button
          onClick={() => dispatch(setMultiSelectMode(!multiSelectMode))}
          disabled={onlinePartners.length === 0}
        >
          Multi select
        </Button>
        {multiSelectMode && (
          <>
            <Tooltip title='Delete selected'>
              <div className='btnsContainer__btn' onClick={handleMultiDel}>
                <FaTrash className='deleteIcon' />
              </div>
            </Tooltip>
            <Tooltip title='Copy selected here'>
              <div className='btnsContainer__btn' onClick={handleMultiCopyHere}>
                <FaCopy className='copyIcon' />
              </div>
            </Tooltip>
            <Tooltip title='Copy selected anywhere'>
              <div
                className='btnsContainer__btn'
                onClick={handleMultiCopyAnywhere}
              >
                <IoCopy className='copyIcon' />
              </div>
            </Tooltip>
          </>
        )}
      </div>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={onlinePartners.map((i: IOnlinePartner) => i.order)}
          strategy={verticalListSortingStrategy}
        >
          <CustomTable
            columns={onlinePartnersColumns(
              handleEditOnPartner,
              handleDelOnPartner,
              handleOnPartnerStatus,
              handleCopyHere,
              handleCopyAnywhere,
              handleSelect,
              multiSelectMode,
              selectedOnlinePartners,
              onlinePartners,
              handleFilter,
            )}
            data={onlinePartners}
            loading={loading}
            rowKey={(record: any) => record.order}
            components={{
              body: {
                row: Row
              }
            }}
          />
        </SortableContext>
      </DndContext>
    </CustomCard>
  )
}

const Row = memo(({ children, ...props }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: props['data-row-key']
  })

  const style = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 999 } : {})
  }

  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, child => {
        if ((child as React.ReactElement).key === 'sort') {
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <AiOutlineMenu
                //@ts-ignore
                ref={setActivatorNodeRef}
                style={{ touchAction: 'none', cursor: 'move' }}
                {...listeners}
              />
            )
          })
        }
        return child
      })}
    </tr>
  )
})

export default OnlinePartnersTable
