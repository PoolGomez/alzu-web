'use client';
import DeleteButton from "@/components/DeleteButton";
import UserTabs from "@/components/layout/UserTabs";
import {FormEvent, ReactEventHandler, useEffect, useState} from "react";
import {useProfile} from "@/components/UseProfile";
import toast from "react-hot-toast";
import { DataProfileType } from "@/libs/types";

interface DataCategory{
  _id?: string;
  name: string;
}
interface DataCategory2{
  _id: string;
  name: string;
}

export default function CategoriesPage(){
    
    const [ categoryName, setCategoryName] = useState('');
    const [ categories, setCategories] = useState([]);
    const { loading : profileLoading, data: profileData }
    :{loading: boolean, data: DataProfileType | undefined}
    = useProfile();
    const [ editedCategory, setEditedCategory] = useState<DataCategory | null>(null);

    useEffect(()=>{
        fetchCategories();
        console.log('profileData');
        console.log(profileData);
    },[]);

    function fetchCategories() {
        fetch('/api/categories').then(res => {
            res.json().then(categories => {
            setCategories(categories);
            });
        });
    }


    async function handleCategorySubmit(ev: FormEvent<HTMLFormElement>){
        ev.preventDefault();
        const creationPromise = new Promise<void>(async (resolve, reject)=>{
            const data: DataCategory = { name : categoryName}
            if (editedCategory) {
                data._id = editedCategory._id;
            }
            const response = await fetch('/api/categories', {
                method: editedCategory ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            
            setCategoryName('');
            fetchCategories();
            setEditedCategory(null);
            if (response.ok)
                resolve();
            else
                reject();
        });

        await toast.promise(creationPromise, {
            loading: editedCategory
                        ? 'Updating category...'
                        : 'Creating your new category...',
            success: editedCategory ? 'Category updated' : 'Category created',
            error: 'Error, sorry...',
        });
    }

    async function handleDeleteClick(_id : string) {
        const promise = new Promise<void>(async (resolve, reject) => {
          const response = await fetch('/api/categories?_id='+_id, {
            method: 'DELETE',
          });
          if (response.ok) {
            resolve();
          } else {
            reject();
          }
        });
    
        await toast.promise(promise, {
          loading: 'Deleting...',
          success: 'Deleted',
          error: 'Error',
        });
    
        fetchCategories();
    }


    if (profileLoading) {
        return 'Loading user info...';
    }

    // if (!profileData.admin) {
    //     return 'Not an admin';
    // }
    if (!profileData?.admin) {
      return 'Not an admin';
    }
    

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              {editedCategory ? 'Update category' : 'New category name'}
              {editedCategory && (
                <>: <b>{editedCategory.name}</b></>
              )}
            </label>
            <input type="text"
                   value={categoryName}
                   onChange={ev => setCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">
              {editedCategory ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName('');
              }}>
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-sm text-gray-500">Existing categories</h2>
        {categories?.length > 0 && categories.map((category: DataCategory2) => (
          <div
            key={category._id}
            className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
            <div className="grow">
              {category.name}
            </div>
            <div className="flex gap-1">
              <button type="button"
                      onClick={() => {
                        setEditedCategory(category);
                        setCategoryName(category.name);
                      }}
              >
                Edit
              </button>
              <DeleteButton
                label="Delete"
                onDelete={() => handleDeleteClick(category._id)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}