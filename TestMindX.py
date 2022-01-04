'''
#Bai 1:
a = ''
g = input("Nhap vao mot day so, cach nhau boi dau ' ': ")
for i in g:
    if i.isdigit() == True:
        a += i
    else:
        print(a)
        a = ''
print(a)

'''
#Bai 2:

g = input("Nhap vao mot day so, cach nhau boi dau phay: ")
if len(g) > 1:
    alist = [] #cac so ban dau
    blist = [] #cac cap so
    clist = [] #index cua cap so
    a = '' # moi so trong list
    for i in g:
        if i.isdigit() == True:
            a += i
        elif i == ',':
            alist += [int(a)]
            a = ''
    alist += [int(a)]
    for i in alist:
        if alist.index(i) != len(alist) - 1:
            for j in range(alist.index(i) + 1, len(alist)):
                if i*alist[j] == 128:
                    blist += i, alist[j]
                    clist += alist.index(i), j
    if len(blist) != 0:
        print('Co nhung cap so sau co tich = 128:')
        for i in range(0, len(blist), 2):
            print(blist[i],'va',blist[i+1],'tai vi tri',clist[i],'va',clist[i+1])
    
                

    
    
        
    
