import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import ListItem from '../ListItem';

describe('ListItem component', () => {
  let listItem;
  let event;

  // mock props
  const removeItem = jest.fn();
  const updateItem = jest.fn();
  const id = 'testId';
  const content = 'testContent';

  describe('Tests with all defined props', () => {
    beforeEach(() => {
      listItem = shallow(
        <ListItem
          id={id}
          content={content}
          removeItem={removeItem}
          updateItem={updateItem}
        />);
      removeItem.mockClear();
      updateItem.mockClear();
    });

    it('Renders correctly', () => {
      expect(shallowToJson(listItem)).toMatchSnapshot();
    });

    describe('Unit test: handleRemove', () => {
      it('Calls removeItem in handleRemove', () => {
        listItem.instance().handleRemove();
        expect(removeItem).toHaveBeenCalled();
      });
    });

    describe('Unit test: handleChange', () => {
      beforeEach(() => {
        event = {
          target: {
            name: 'content',
            value: 'testValue',
          },
        };
      });

      it('handles input change', () => {
        expect(listItem.instance().state.content).toBe(content);
        listItem.instance().handleChange(event);
        expect(listItem.instance().state.content).toBe('testValue');
      });
    });

    describe('Unit test: openEditMode', () => {
      it('correctly sets state', () => {
        expect(listItem.instance().state.editStatus).toBe(false);
        listItem.instance().openEditMode();
        expect(listItem.instance().state.editStatus).toBe(true);
      });
    });

    describe('Unit test: closeEditMode', () => {
      it('calls updateItem', () => {
        listItem.instance().closeEditMode();
        expect(updateItem).toHaveBeenCalled();
      });

      it('correctly sets state', () => {
        listItem.instance().closeEditMode();
        expect(listItem.instance().state.editStatus).toBe(false);
      });
    });

    describe('removeItem functionality', () => {
      it('Calls removeItem on button click', () => {
        listItem.find('button').simulate('click');
        expect(removeItem).toHaveBeenCalled();
      });
    });

    describe('updateItem functionality', () => {
      it('updateItem available for call', () => {
        expect(listItem.find('span').prop('onClick')).not.toBe(null);
      });

      it('Correctly handles span click, input blur', () => {
        expect(listItem.instance().state.editStatus).toBe(false);
        listItem.find('span').simulate('click');
        expect(listItem.instance().state.editStatus).toBe(true);
        listItem.find('input').simulate('blur');
        expect(updateItem).toHaveBeenCalled();
        expect(listItem.instance().state.editStatus).toBe(false);
      });
    });
  });

  describe('Tests with undefined updateItem prop', () => {
    beforeEach(() => {
      listItem = shallow(
        <ListItem
          id={id}
          content={content}
          removeItem={removeItem}
        />);
      removeItem.mockClear();
      updateItem.mockClear();
    });

    it('Renders correctly', () => {
      expect(shallowToJson(listItem)).toMatchSnapshot();
    });

    describe('Unit test: handleRemove', () => {
      it('Calls removeItem in handleRemove', () => {
        listItem.instance().handleRemove();
        expect(removeItem).toHaveBeenCalled();
      });
    });

    describe('Unit test: handleChange', () => {
      beforeEach(() => {
        event = {
          target: {
            name: 'content',
            value: 'testValue',
          },
        };
      });

      it('handles input change', () => {
        expect(listItem.instance().state.content).toBe(content);
        listItem.instance().handleChange(event);
        expect(listItem.instance().state.content).toBe('testValue');
      });
    });

    describe('Unit test: openEditMode', () => {
      it('correctly sets state', () => {
        expect(listItem.instance().state.editStatus).toBe(false);
        listItem.instance().openEditMode();
        expect(listItem.instance().state.editStatus).toBe(true);
      });
    });

    describe('Unit test: closeEditMode', () => {
      it('doesn\'t call updateItem', () => {
        listItem.instance().closeEditMode();
        expect(updateItem).not.toHaveBeenCalled();
      });

      it('correctly sets state', () => {
        listItem.instance().closeEditMode();
        expect(listItem.instance().state.editStatus).toBe(false);
      });
    });

    describe('removeItem functionality', () => {
      it('Calls removeItem on button click', () => {
        listItem.find('button').simulate('click');
        expect(removeItem).toHaveBeenCalled();
      });
    });

    describe('updateItem functionality', () => {
      it('updateItem is not available for call', () => {
        expect(listItem.find('span').prop('onClick')).toBe(null);
      });

      it('Correctly handles span click', () => {
        expect(listItem.instance().state.editStatus).toBe(false);
        listItem.find('span').simulate('click');
        expect(listItem.instance().state.editStatus).toBe(false);
      });
    });
  });

  describe('Tests with undefined removeItem prop', () => {
    beforeEach(() => {
      listItem = shallow(
        <ListItem
          id={id}
          content={content}
          updateItem={updateItem}
        />);
      removeItem.mockClear();
      updateItem.mockClear();
    });

    it('Renders correctly', () => {
      expect(shallowToJson(listItem)).toMatchSnapshot();
    });

    describe('Unit test: handleRemove', () => {
      it('Doesn\'t call removeItem in handleRemove', () => {
        listItem.instance().handleRemove();
        expect(removeItem).not.toHaveBeenCalled();
      });
    });

    describe('Unit test: handleChange', () => {
      beforeEach(() => {
        event = {
          target: {
            name: 'content',
            value: 'testValue',
          },
        };
      });

      it('handles input change', () => {
        expect(listItem.instance().state.content).toBe(content);
        listItem.instance().handleChange(event);
        expect(listItem.instance().state.content).toBe('testValue');
      });
    });

    describe('Unit test: openEditMode', () => {
      it('correctly sets state', () => {
        expect(listItem.instance().state.editStatus).toBe(false);
        listItem.instance().openEditMode();
        expect(listItem.instance().state.editStatus).toBe(true);
      });
    });

    describe('Unit test: closeEditMode', () => {
      it('calls updateItem', () => {
        listItem.instance().closeEditMode();
        expect(updateItem).toHaveBeenCalled();
      });

      it('correctly sets state', () => {
        listItem.instance().closeEditMode();
        expect(listItem.instance().state.editStatus).toBe(false);
      });
    });

    describe('removeItem functionality', () => {
      it('Doesn\'t call removeItem on button click', () => {
        listItem.find('button').simulate('click');
        expect(removeItem).not.toHaveBeenCalled();
      });
    });

    describe('updateItem functionality', () => {
      it('updateItem is available for call', () => {
        expect(listItem.find('span').prop('onClick')).not.toBe(null);
      });

      it('Correctly handles span click, input blur', () => {
        expect(listItem.instance().state.editStatus).toBe(false);
        listItem.find('span').simulate('click');
        expect(listItem.instance().state.editStatus).toBe(true);
        listItem.find('input').simulate('blur');
        expect(updateItem).toHaveBeenCalled();
        expect(listItem.instance().state.editStatus).toBe(false);
      });
    });
  });
});
