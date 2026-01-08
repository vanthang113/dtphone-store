import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';

interface CustomerTagsProps {
  customerId: string;
  tags: string[];
  onTagUpdate: (customerId: string, tags: string[]) => void;
}

export default function CustomerTags({ customerId, tags, onTagUpdate }: CustomerTagsProps) {
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      onTagUpdate(customerId, [...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    onTagUpdate(customerId, tags.filter((t) => t !== tag));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
            {tag}
            <Button
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0"
              onClick={() => handleRemoveTag(tag)}
            >
              <X className="w-3 h-3" />
            </Button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          placeholder="Thêm nhãn mới (VD: VIP, Mới...)"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          className="w-48"
        />
        <Button size="sm" onClick={handleAddTag}>
          <Plus className="w-4 h-4 mr-1" />
          Thêm
        </Button>
      </div>
    </div>
  );
}