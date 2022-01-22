class AddTagToTodos < ActiveRecord::Migration[6.1]
  def change
    add_column :todos, :tag, :text
  end
end
